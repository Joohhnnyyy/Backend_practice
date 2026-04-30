const express = require("express")
const cookieParsaer = require("cookie-parser")
const cors = require("cors")
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")

const app = express();

app.use(express.json())
app.use(cookieParsaer())
app.use(cors({
  credentials:true,
  origin:["http://localhost:5173","http://localhost:5174"]
}))

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/user",userRouter)
module.exports = app;