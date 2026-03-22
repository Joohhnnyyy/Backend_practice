const express = require('express');

const app = express();//creating server instance

app.get('/',(req,res) =>{
  res.send('Hello World');
})

app.get('/about',(req,res) =>{
  res.send('This is the about page');
});

app.get('/contact',(req,res) =>{
  res.send('This is the contact page');
});
module.exports = app;