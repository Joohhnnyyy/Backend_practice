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
  res.status(201);


})

app.get('/' ,(req,res) =>{
    res.send('Hello World');
})
app.get('/about' ,(req,res) =>{
    res.send('This is the about page');
})

app.get('/contact' ,(req,res) =>{
    res.send('This is the contact page');
})
module.exports = app;