const nodemailerConfig = require("./nodemailerConfig");
const nodemailer = require("nodemailer");

console.log("nodemailerConfig:", nodemailerConfig);

function sendEmail(emailData) {
    const transporter = nodemailer.createTransport(nodemailerConfig);
    // console.log("emailData:", emailData);
    const email = { ...emailData, from: "bohdan.yashchyshyn@meta.ua" };
    // console.log("email", email);
    transporter
        .sendMail(email)
        .then(() => console.log("Email send success"))
        .catch((error) => console.log(error.message));
    return true;
}

module.exports = sendEmail;
