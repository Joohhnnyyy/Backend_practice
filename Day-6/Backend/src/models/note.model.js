const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
  title:String,
  description:String
})


//here we are creating collections

const noteModel = mongoose.model("notes",notesSchema)

module.exports = noteModel;