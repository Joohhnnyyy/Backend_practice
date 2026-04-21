const express = require("express")
const cookieParsaer = require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const app = express();

app.use(express.json())
app.use(cookieParsaer())

app.use("/api/auth",authRouter)

module.exports = app;