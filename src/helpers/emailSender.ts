import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: process.env.SENDER_LOGIN,
    pass: process.env.SENDER_PASSWORD,
  },
});

function emailSender({ email, smtp }) {
  const newMessage = {
    from: process.env.SENDER_LOGIN,
    to: email,
    subject: "SMTP",
    html: `<p>Your one-time access password <b>${smtp}</b></p>`,
  };

  transporter.sendMail(newMessage, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default emailSender;
