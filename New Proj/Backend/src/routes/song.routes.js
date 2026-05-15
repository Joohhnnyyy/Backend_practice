const express = require("express");
const songRouter = express.Router();
const upload = require("../middlewares/upload.middleware")
const songController = require("../controllers/song.controller")


// post /api/songs/  set the songs

songRouter.post("/",upload.single("song"),songController.uploadSong)


//get /api/songs / get the song 

songRouter.get("/",songController.getSong)
module.exports = songRouter;