const fs = require("fs");

const allNotes = require('../db/db.json');


module.exports = function(app){
    
    //Will display api note array
    app.get('/api/notes', (req, res) => {
        res.json(notesFile.slice(1));
    });

    app.get("/api/notes/:id", function(req, res) {
        let noteData = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        res.json(noteData[parseInt(req.params.id)]);
    });

    app.post("/api/notes", function(req, res) {
        let noteData = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        
       //Generating new Id to new note (req.body)
        req.body.id = (noteData.length).toString();
        noteData.push(req.body);
    
        fs.writeFileSync("../db/db.json", JSON.stringify(noteData));
        console.log("Note saved to db.json. Content: ", req.body);
        res.json(noteData);
    });

        // Deleting note according to its ID
    app.delete("/api/notes/:id", function(req, res) {
        let noteData = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        noteData = noteData.filter(currentNote => currentNote.id != req.params.id);
        let newID = 0;
        for (currentNote of noteData) {
            currentNote.id = newID.toString();
            newID++;
        }

        fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
        res.json(noteData);
    })
    
}









// // Invoking buidNewNote and DeleNode Function
// const {buildNewNote, deleteNote} = require('../../lib/notesCreationFunctions')

// router.get("/", (req, res) => {
//     res.json(allNotes.slice(1));
    
// });

// router.post("/", (req, res) => {
//     const newNote = buildNewNote(req.body, allNotes);
//     res.json(newNote);
  
// });

// router.delete("/:id", (req, res,next) => {
//     deleteNote(req.params.id, allNotes);
//     res.json(true);
    
// });

// module.exports = router;