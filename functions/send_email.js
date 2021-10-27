import { transporter } from "./mail.js";


try {

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"New profiles LinkedIn 🤩" <angiedesarrollo@gmail.com>', // sender address
        to: "2160@holbertonschool.com", // list of receivers
        subject: "Hi New Users LinkedIn", // Subject line
        text: "This is a new users of LinkedIn", // plain text body
        html: "<b>Welcome Users LinkedIn</b>", // html body
    });
    console.log(info)
} catch (error) {
    console.log('Fake error in email')
}
