import "dotenv/config";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// var transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "59ebce3806dbe4",
//     pass: "5bc9a698758b88"
//   }
// });

export const sendVerificationMail = async (userMail, verificationLink) => {
  const message = {
    from: "slavika86@gmail.com",
    to: userMail,
    subject: "Verification",
    html: `<div style="margin: 50px">
      <h2> Welcome in our app!</h2>
      <p>To verificate your account please tap the <a href="http://localhost:3000/api/users/verification/${verificationLink}">link</a></p>
      </div>`,
    text: `Welcome in our app! To verificate your account please open link - ${verificationLink}`,
  };
  await transport.sendMail(message).then(console.log).catch(console.error);
};
