import dotenv from 'dotenv';
import nodemailer from "nodemailer";

dotenv.config();

// create reusable transporter object using the default SMTP transport
export const transporter = await nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
});

await transporter.verify().then(() => (
  console.log('Ready for send emails')
));

export default transporter;
