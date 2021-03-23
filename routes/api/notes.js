const express = require('express');
const router = express.Router();
const allNotes = require('../../db/db.json');


// Invoking buidNewNote and DeleNode Function
const {buildNewNote, deleteNote} = require('../../lib/notesCreationFunctions')

router.get("/", (req, res) => {
    res.json(allNotes.slice(1));
    
});

router.post("/", (req, res) => {
    const newNote = buildNewNote(req.body, allNotes);
    res.json(newNote);
  
});

router.delete("/:id", (req, res,next) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
    
});

module.exports = router;