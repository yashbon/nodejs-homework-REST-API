const nodemailerConfig = require("./nodemailerConfig");
const nodemailer = require("nodemailer");
const { EMAIL_SENDER } = process.env;

function sendEmail(emailData) {
    const transporter = nodemailer.createTransport(nodemailerConfig);
    const email = { ...emailData, from: EMAIL_SENDER };
    transporter
        .sendMail(email)
        .then(() => console.log("Email send success"))
        .catch((error) => console.log(error.message));
    return true;
}

module.exports = sendEmail;
