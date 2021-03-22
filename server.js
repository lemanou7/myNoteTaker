const path = require('path');
const express = require('express');
const app = express();

//Getting Note file
const notesFile = require('./db/db.json');

//Setting Server Port
const PORT = process.env.PORT || 8080;

// Invoking buidNewNote and DeleNode Function
const {buildNewNote, deleteNote} = require('./lib/notesCreationFunctions')

app.use(express.urlencoded({ extended: true }));
//Will enabled json use 
app.use(express.json());
//pointing public folder as static files folder
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    res.json(notesFile.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.post('/api/notes', (req, res) => {
    const newNote = buildNewNote(req.body, notesFile);
    res.json(newNote);
});


app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notesFile);
    res.json(true);
});

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});
