const express = require('express');

const app = express();//creating server instance

app.get('/',(req,res) =>{
  res.send('Hello World');
})
module.exports = app;