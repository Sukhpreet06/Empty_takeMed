const nodemailer = require("nodemailer");
console.log("process.env.EMAIL_USER---",process.env.EMAIL_USER);
console.log("process.env.EMAIL_PASS---",process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your email
    pass: process.env.EMAIL_PASS    // app password
  }
});

module.exports = transporter;
