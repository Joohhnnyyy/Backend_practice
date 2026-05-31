import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { configDotenv } from "dotenv";

configDotenv()
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API
});


export function testAi(){
  model.invoke("how are you doing buddy")
  .then((response)=>{
    console.log(response.text)
  })

}


