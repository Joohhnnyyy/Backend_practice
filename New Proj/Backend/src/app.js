const express = require("express")
const cors = require("cors")
const authRoute = require("./routes/auth.routes")
const songRouter = require("./routes/song.routes")
const cookieParser = require("cookie-parser")
const { errorHandler } = require("./middlewares/errorHandler.middleware")
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use("/api/auth",authRoute)
app.use("/api/songs" ,songRouter)
app.use(errorHandler)
module.exports = app;
