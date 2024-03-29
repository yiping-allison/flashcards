// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db

// Creating Flashcard database
const cmdStr = 'CREATE TABLE Flashcards (user TEXT, english TEXT, korean TEXT, seen INT, correct INT )'
db.run(cmdStr,tableCreationCallback);
// Creating User database
const cmdStr2 = 'CREATE TABLE UserInfo (firstName TEXT, lastName TEXT, googleID TEXT)'
db.run(cmdStr2, tableCreationCallback);

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database created");
	db.close();
    }
}
