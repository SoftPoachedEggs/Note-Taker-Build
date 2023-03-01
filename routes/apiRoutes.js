//import the Express.js framework and create a new router instance.
const express = require('express')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

//iport Node.JS filesystem module and load the JSON data from the Db.json file
const fs = require('fs');
let db = require('../db/db.json');

//GET route for '/notes' that sends the db JSON data as a response.
router.get('/notes', (req, res) => {
  db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
  res.json(db);

});
//Defines a post route for /notes that generates a new note object with a unique ID and adds it to the db array. 
router.post('/notes', (req, res) => {
  let saveNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  }
//push new note object to end of db array include error catch
  db.push(saveNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(db), (err, res) => {
    if(err) throw err;
  });
// Send the contents of the database as a JSON response
  res.json(db);

})

//route handler to handle DELETE request
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id; // Get the ID of the note to be deleted from the request parameter
  const noteIndex = db.findIndex(note => note.id === noteId); // Find the index of the note in the db array

  if (noteIndex !== -1) {
    db.splice(noteIndex, 1); // Remove the note from the db array
    fs.writeFileSync('./db/db.json', JSON.stringify(db)); // Update the JSON file with the new db array
    res.sendStatus(204); // Send a 204 (No Content) response indicating the deletion was successful
  } else {
    res.sendStatus(404); // Send a 404 (Not Found) response if the note with the specified ID was not found
  }
});

module.exports = router;