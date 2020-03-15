const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const unID = Date.now();
const noteArr = [];

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'Develop/public' });
});

app.get('/notes', (req, res) => {
    res.sendFile('notes.html', { root: 'Develop/public' });
});

app.get('/api/notes', (req, res) => {
    let jsonFile = fs.readFileSync(path.join(__dirname, '/Develop/db/db.json'), 'utf8')
    return res.json(jsonFile);
});

app.post('/api/notes', (req, res) => {
    noteObject = {
        title : req.body.title,
        text: req.body.text,
        ID: unID
    }

    noteObject ? noteArr.unshift(noteObject) : console.error();
    
    fs.writeFileSync(path.join(__dirname, '/Develop/db/db.json'), JSON.stringify(noteArr));

    console.log(noteObject);

    return res.json(noteObject);
});


app.get('/api/notes:id', (req, res) => {
    console.log('working')
})



app.listen(PORT, () => {
    console.log('App lsitening to port ' + PORT);
});