import { User } from "../entities/User";

const nodemailer = require("nodemailer");



export async function mail(user_email: string, sender_name: string, compliment: string, message: string) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env['API_MAIL'],//replace with your email
            pass: process.env['API_MAIL_PASSWORD']//replace with your password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"NLW Valoriza 👨‍💻" <${process.env['API_MAIL']}>`, // sender address
        to: user_email, // list of receivers
        subject: "Congratulations! You received a compliment", // Subject line
        text: `You received the ${compliment} compliment by ${sender_name} with the message ${message}`,
        html: `<b>You received the ${compliment} compliment by ${sender_name} with the message ${message}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}