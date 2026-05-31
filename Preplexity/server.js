import { configDotenv } from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/databse.js";
import { testAi } from "./src/services/ai.service.js";
configDotenv()
const PORT = Number.parseInt(process.env.PORT ?? "3000", 10);


testAi()

connectDB()
    .catch((err)=>{
      console.log("MongoDB Connection fail" , err)
      process.exit(1);
    });

app.listen(PORT, "0.0.0.0", ()=>{
  console.log(`server is running on the port ${PORT}`)
})