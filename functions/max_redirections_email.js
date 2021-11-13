import {transporter} from "./mail.js";
import dotenv from 'dotenv';

dotenv.config();
export default async function max_redirection_email(func) {
  await transporter.sendMail({
    from: '"Founder Scout"' + process.env.EMAIL_SUPP, // sender address
    to: process.env.EMAIL_SUPP, // list of receivers
    subject: "Founder Scout - max redirections present in " + func + " search function", // Subject line
    text: "There are the new co-founder profiles from LinkedIn", // plain text body
    html: `<h1 style="background-color: #000000; color: #ffffff; text-align: center; padding: 0.3rem;">
                   Max redirections in ${func} function
                 </h1>
                 <p>You must change the header information in the fetch function. Then restart the process with PM2 on the server.</p>      
                `, // html body
  });
}
