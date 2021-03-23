const path = require('path');
const fs = require("fs");
const express = require('express');
const app = express();

//Getting Note file
const notesFile = require('./db/db.json');

//Setting Server Port
const PORT = process.env.PORT || 8080;

// // Invoking buidNewNote and DeleNode Function
// const {buildNewNote, deleteNote} = require('./lib/notesCreationFunctions')


//Will enabled json use 
app.use(express.json());
//
app.use(express.urlencoded({ extended: true }));
//pointing public folder as static files folder
app.use(express.static('public'));

//Will display api note array
app.get('/api/notes', (req, res) => {
    res.json(notesFile.slice(1));
});

// Will display main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Will display notes list
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get("/api/notes/:id", function(req, res) {
    let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(noteData[Number(req.params.id)]);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post("/api/notes", function(req, res) {
    let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
   //Generating new Id to new note (req.body)
    req.body.id = (noteData.length).toString();
    noteData.push(req.body);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
    console.log("Note saved to db.json. Content: ", req.body);
    res.json(noteData);
})
// Deleting note according to its ID
app.delete("/api/notes/:id", function(req, res) {
    let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newID = 0;
    
    noteData = noteData.filter(currentNote => currentNote.id != req.params.id);
     
    for (currentNote of noteData) {
        currentNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
    res.json(noteData);
})


app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});