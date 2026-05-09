require("dotenv").config();
const connectDB = require("./src/config/database")


const app = require("./src/app")
connectDB();
app.listen(3000,()=>{
  console.log("Server is Running on port 3000")
})

