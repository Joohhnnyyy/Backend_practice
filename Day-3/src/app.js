const express = require('express');

const app = express();

app.use(express.json());


const notes  = [
  {
    title: 'Note 1',
    content: 'This is the content of note 1'
  },
  {
    title: 'Note 2',
    content: 'This is the content of note 2'
  }
]

app.get('/notes' ,(req,res) =>{
    res.json(notes);
})

app.post('/notes' ,(req,res) =>{
  const { title , content } = req.body;
  const newNotes = {
    title,
    content
  }
  console.log(newNotes);
  notes.push(newNotes);
  res.json(newNotes);
  res.send('Note added successfully');


})

app.delete('/notes/:index' ,(req,res) =>{
  delete notes[req.params.index];
  res.send("note Deleted");
})

app.patch('/notes/:index' ,(req,res) =>{
  notes[req.params.index].description = req.body.description;
  res.send("note updated");
  
})

module.exports = app;


