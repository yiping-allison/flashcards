"use strict"

// API setup
const APIrequest = require('request');
const http = require('http');
const APIkey = "AIzaSyCFWobfAAfYKzDpYsH5c4mkglwRnqNQ6QE";  // changed 
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey;

// server setup
const express = require('express');
const port = 53527;

// sqlite setup
const sqlite3 = require("sqlite3").verbose(); // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);

function queryHandler(req, res, next) {
	let rurl = req.url;
	let qObj = req.query;
	//console.log(rurl);
	//console.log(qObj);
	if (qObj.english != undefined) {
		let requestObj = {
			"source": "en",
			"target": "ko",
			"q": [
				qObj.english
			]
		};

		// An object containing the data expressing the query to the
		// translate API. 
		// Below, gets stringified and put into the body of an HTTP PUT request.
	    
		// The call that makes a request to the API
		// Uses the Node request module, which packs up and sends off
		// an HTTP message containing the request to the API server
		APIrequest(
			{ // HTTP header stuff
	    		url: url,
	    		method: "POST",
	    		headers: {"content-type": "application/json"},
	    		// will turn the given object into JSON
	    		json: requestObj	},
			// callback function for API request
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
					//console.log("In Korean: ", 
		    			//APIresBody.data.translations[0].translatedText);
					//console.log("\n\nJSON was:");
					//console.log(JSON.stringify(APIresBody, undefined, 2));
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
		const cmdStr = 'INSERT into Flashcards (user, english, korean, seen, correct) VALUES (1, @0, @1, 0, 0)';
		db.run(cmdStr, qObj.english, qObj.korean, insertCallback);
		function insertCallback(err) {
			if (err) {
				console.log("err");
			}
		}	
	} else {
		next();
	}
}

function fileNotFound(req, res) {
	let url = req.url;
	res.type('text/plain');
	res.status(404);
	res.send('Cannot find '+url);
}

const app = express()
app.use(express.static('public'));
app.get('/translate', queryHandler);
app.get('/store', storeHandler);
app.use(fileNotFound);

app.listen(port, function () { console.log('Listening...'); })
