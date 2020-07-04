const express = require('express');
const { urlencoded } = require('body-parser');
const path = require("path");
const fs = require('fs');

//Database
let db = require('./db/db.json');

//Chosen port and express activated
var PORT = process.env.PORT || 8080;
var app = express();


//creating connections to use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for things running on the frontend
app.use(express.static(__dirname + '/public'));

//Routing
//HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
    
//API routes
app.get('/api/notes',  (req, res) => {
     // Read the `db.json` file and return all saved notes as JSON
    res.json(db);
});

//to add a note  to the db.json
app.post('api/notes', (req, res) => {
    //receiving new note
    let newNote = req.body;
    //pushing new note to db
    db.push(newNote);
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(db), (err) => {
        if(err) throw err;  
    });
    res.json(db);  
});

//to delete a note from the db.json
app.delete('api/notes', (req, res) => {
    //receiving the note id as a parameter 
    let id = req.params.body;
    //looking and deleting a specific id  
    for (var i = 0; i < db.length; i++){
        if (id === id[i].id){
            db = db.filter((note) => {
                return note.id != id;
        });
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(db), (err) => {
            if(err) throw err;  
        });
        return res.json(db);  
        }
    };
    return  res.json(false);  
});



//SERVER LISTEN
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
})