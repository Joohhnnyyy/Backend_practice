const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())

app.post("/api/notes" ,async (req,res) =>{
  const {title ,description} = req.body;
  const note = await noteModel.create({
    title,description
  })
  res.status(201).json({
    message:"note Created successfully",
    note
  })
})

app.get("/api/notes", async(req,res) =>{
  const notes = await noteModel.find()//find return the data in the array of objects 
  res.status(200).json({
    message:"Data is feteched",
    notes
  })
})

app.delete("/api/notes/:id" ,  async (req, res) =>{
  
  await noteModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message:"note is Deleted"
  })
  
})

app.patch("/api/notes/:id" , async (req,res) =>{
  const {description} = req.body;
  const note = await noteModel.findByIdAndUpdate(req.params.id, { description } );
  res.status(200).json({
    message:"note Updated"
  })
})

module.exports = app;