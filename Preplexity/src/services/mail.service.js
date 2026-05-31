import nodemailer from "nodemailer"
import { configDotenv } from "dotenv"
configDotenv();

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    type:"oAuth2",
    user:process.env.GOOGLE_USER,
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    refreshToken:process.env.GOOGLE_REFRESH_TOKEN
  },

})

transporter.verify((error , success) =>{
  if(error){
    console.error("Error conneting to email servcer:" ,error)
  }
  else{
    console.log("Email server is ready to send message");
  }
})

export async function sendEmail({to,subject,html,text}){
  const mailOptions = { 
    from : process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text
  };
  const details = await transporter.sendMail(mailOptions);
  console.log("Email send:" ,details);
}