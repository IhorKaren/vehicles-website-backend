import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: "karenihor@gmail.com",
    pass: "D22B462B19F7233D72FB9F22490ABBDDBCF0",
  },
});

function emailSender({ email, smtp }) {
  const newMessage = {
    from: "karenihor@gmail.com",
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
