const express = require('express');
const router = express.Router();
const allNotes = require('../../db/db.json');



router.get("/", (req, res, next) => {
    res.json(allNotes.slice(1));
    next();
});

router.post("/", (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
  
});

router.delete("/:id", (req, res,next) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
    
});

module.exports = router;