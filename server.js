"use strict"

// API setup
const APIrequest = require('request');
const http = require('http');
// TODO: Enter your API key below
const APIkey = "Enter your key here!";
// Url to request translation data from Google API 
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey;

// server setup
const express = require('express');
const port = ""; // TODO: Enter your port number here (If needed)

// sqlite setup
const sqlite3 = require("sqlite3").verbose(); // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);

// Authentication Setup
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');
// Google login data
const googleLoginData = {
	// TODO: Enter Google Credentials - OAuth 2.0 Client IDs here!
	clientID: '',
	clientSecret: '',
    	callbackURL: '/auth/redirect'
}
passport.use( new GoogleStrategy(googleLoginData, gotProfile) ); // let passport know we're using login with Google

// building server pipeline
const app = express(); // object that implements express server

app.use('/', printURL); // echoes URL for debugging

// checking validty of cookies at the beginning of pipeline
// will get cookies, decrypt, and check if session is going on
app.use(cookieSession({
	maxAge: 6 * 60 * 60 * 1000, // 6 hrs in milliseconds
	keys: ['hanger waldo mercy dance'] // random str for encryption
}));

app.use(passport.initialize()); // intializes request obj for further handling by passport

// if there's a valid cookie, call deserializeUser()
app.use(passport.session());

app.get('/*', express.static('public')); // public static files

// handler for url that starts login with Google
// app (in public/login.html) redirects to here
// tells browser to redirect to Google
// scope: profile -> Ask Google for user profile info
app.get('/auth/google',
	passport.authenticate('google', {scope: ['profile'] }));
// Google redirects here after user successfully logs in
// route has 3 handler functions, one run after another
app.get('/auth/redirect',
	function (req, res, next) {
		console.log("At auth/redirect");
		next();
	},
	passport.authenticate('google'),
	function (req, res) {
		console.log('Logged in and using cookies!')
		res.redirect('/auth/accept');
	});

// static files in /user are only available after login
app.get('/user/*',
	isAuthenticated,
	express.static('.')
	);

// All queries
app.get('/user/translate', queryHandler);
app.get('/user/store', storeHandler);
app.get('/user/username', userHandler);
app.get('/user/randomword', wordHandler);
app.get('/user/updateCorrect', corHandler);
app.get('/auth/accept', authHandler);

// not found -> applies to everything
app.use( fileNotFound );

// pipeline is ready
app.listen(port, function() {console.log('Listening...');} );

// middleware functions

// print the url of incoming HTTP request
function printURL (req, res, next) {
	console.log(req.url);
	next();
}

// function which checks if a user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
	if (req.user) {
		console.log("Req session: ", req.session);
		console.log("req.user: ", req.user);
		next();
	} else {
		res.redirect('/login.html'); // send response telling
		// browser to go to login page
	}
}

function gotProfile(accessToken, refreshToken, profile, done) {
	//console.log("Google profile: ", profile);
	// Second arg will be passed into serializeUser
	// key to get user out of database
	let dbRowID = profile.id; 
	// should be the unique key for dbRow for this user in DB table
	db.get("SELECT * FROM UserInfo WHERE googleID='"+dbRowID+"'", function(error, row) {
		if (error) {
			console.log('error occured.');
		}
		if (row == undefined) {
			// add user to database (User is new)
			const cmdStr = 'INSERT into UserInfo (firstName, lastName, googleID) VALUES (@0, @1, @2)'
			db.run(cmdStr, profile.name.givenName, profile.name.familyName, profile.id, insertCallback);
			function insertCallback(err) { if (err) { console.log(err); } } 
		}
	});  // Insert user info into database if new user
	done(null, dbRowID);
}

// part of server's session set-up
passport.serializeUser((dbRowID, done) => {
	//console.log("SerializeUser. Input is: ", dbRowID);
	done(null, dbRowID);
});

passport.deserializeUser((dbRowID, done) => {
	let userData = { 
		firstName: "",
		lastName: "",
		id: ""
	};
	
	db.get("SELECT * FROM UserInfo WHERE googleID='"+dbRowID+"'", function(error, row) {
		if (error) {
			console.log('error occured.');
		}
		if (row !== undefined) {
			// grab user info
			userData.firstName = row.firstName;
			userData.lastName = row.lastName;
			userData.id = row.googleID;
			done(null, userData);
		}
	});
});  // Extracts user info and places it into req obj for easy handling

function authHandler(req, res, next) {
	// check if flashcards database is empty
	db.get("SELECT * FROM Flashcards WHERE user='"+req.user.id+"'", function(error, row) {
		if (error) {
			console.log('error occurred.');
			next();
		}
		if (row !== undefined) {
			// redirect to review flashcards
			res.redirect('/user/review.html');
		} else {
			// redirect to create flashcards
			res.redirect('/user/lango.html');
		}
	});
}  // if user is already logged, redirect to lango page

function wordHandler(req, res, next) {
	let cmd = "SELECT * FROM Flashcards WHERE user='" + req.user.id + "' ORDER BY seen";
	let ans = {};
	let stat = false;
	db.all(cmd, (err, rows) => {
		if (err) {
			throw err;
		}
		rows.forEach((row) => {
			let rand = Math.floor((Math.random() * 15) + 1);
			let score = (Math.max(1,5-row.correct) + Math.max(1,5-row.seen) + 5*((row.seen-row.correct)/row.seen));
			if (row.seen == 0) {
				score = 15;
			}
			if (!stat && rand <= score) {
				// send word back to user (Show card)
				ans = {
					"korWd": row.korean,
					"engWd": row.english
				};
				updateSeen(req.user.id, row.seen, row.english);
				stat = true;
			}
		});
		if (Object.keys(ans).length == 0) {
			// place top word
			db.get(cmd, (err, row) => {
				if (row !== undefined) {
					res.json({
						"korWd": row.korean,
						"engWd": row.english
					});
				}
				if (err) {
					throw(err);
				}
			});
		} else {
			res.json(ans);
		} 
	});
}  // Will return the database info of current user

function updateSeen(id, seen, eng) {
	seen = seen + 1;
	
	let str = "UPDATE Flashcards SET seen=" + seen + " WHERE user='" + id + "' AND english='" + eng +"'";
	db.run(str, function(err) {
		if (err) {
			console.log("error");
		}
	});
}  // updates user 'seen' in database

function corHandler(req, res, next) {
	let id = req.user.id;
	console.log("here");
	let cmd = "SELECT * FROM Flashcards WHERE user='"+id+"' AND english='"+req.query.cor+"'";
	db.get(cmd, function(error, row) {
		if (error) {
			throw(err);
		}
		let correct = row.correct;
		correct = correct + 1;
		let str = "UPDATE Flashcards SET correct=" + correct + " WHERE user='" + id + "' AND english='" + req.query.cor +"'";
		console.log(str);
		db.run(str, function(err) {
			if (err) {
				console.log("error");
			}
		});
	});
}  // updates Flashcard database if user is correct

function userHandler(req, res, next) {
	let url = req.url;
	let obj = req.query;
	if (req.user.firstName != undefined) {
		res.json({
			user: req.user.firstName
		});
	} else {
		next();
	}
}  // Returns username

function queryHandler(req, res, next) {
	let rurl = req.url;
	let qObj = req.query;
	if (qObj.english != undefined) {
		let requestObj = {
			"source": "en",
			"target": "ko",
			"q": [
				qObj.english
			]
		};

		APIrequest(
			{ 
	    		url: url,
	    		method: "POST",
	    		headers: {"content-type": "application/json"},
	    		// will turn the given object into JSON
	    		json: requestObj	},
			APIcallback
    		);

    		// callback function, called when data is received from API
    		function APIcallback(err, APIresHead, APIresBody) {
		// gets three objects as input
			if ((err) || (APIresHead.statusCode != 200)) {
	    			// API is not working
	    			console.log("Got API error");
	    			console.log(APIresBody);
			} else {
	    			if (APIresHead.error) {
				// API worked but is not giving you data
				console.log(APIresHead.error);
	    			} else {
					res.json( {
							"English": qObj.english,
							"Korean": APIresBody.data.translations[0].translatedText
						  });
	    			}
			}
    		} // end callback function
	} else {
		next();
	}
}

function storeHandler(req, res, next) {
	// stores flashcard into the database
	let url = req.url;
	let qObj = req.query;

	if (qObj.korean != undefined && qObj.english != undefined) {
		const cmdStr = 'INSERT into Flashcards (user, english, korean, seen, correct) VALUES (@0, @1, @2, @3, @4)';
		db.run(cmdStr, req.user.id, qObj.english, qObj.korean, 0, 0, insertCallback);
		function insertCallback(err) {
			if (err) {
				console.log("err");
			}
		}	
	} else {
		next();
	}
}  // Stores word when user chooses: SAVE

// function for end of server pipeline
function fileNotFound(req, res) {
	let url = req.url;
	res.type('text/plain');
	res.status(404);
	res.send('Cannot find '+url);
}

