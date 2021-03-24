const fs = require('fs');
const path = require('path');

//Function call 
const {createNote, deleteNote} = require('./lib/notesCreationFunctions');

//Server setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

//Getting dababase file
const allNotes = require('./db/db.json');

// url and data parsing setting
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Api Routes
app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

app.get("/api/notes/:id", function (req, res) {
    // let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteData = allNotes.slice(1);
    const found = noteData.some(note => note.id === parseInt(req.params.id));
    let queryNote ={};
    if (found){
        queryNote = noteData.filter(note => note.id === parseInt(req.params.id))
        res.json(queryNote[0]);
    }else{
        res.status(400).json({msg: `${req.params.id} not in the database!`}.msg)
    }
});

app.post('/api/notes', (req, res) => {
    const newNote =createNote(req.body, allNotes);
    res.json(newNote);
});


app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    
    res.json({ msg: `Note with id ${req.params.id} deleted` }.msg);
});


// HTML ROUTES 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}`);
});