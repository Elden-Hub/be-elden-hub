import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(
  email: string,
  url: string,
  subject: string
): Promise<void> {
  // delete this line when you switch to your email
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    // switch to the line below for email
    // host: "smtp.gmail.com",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports like 587
    auth: {
      user: testAccount?.user,
      pass: testAccount?.pass,
      // when you switch this to your email...
      // you're going to want to store it in .env
      // pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "'no reply' <foo@example.com>", // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: "Click on this link to change your password!", // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}
