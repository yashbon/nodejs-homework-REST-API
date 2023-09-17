require("dotenv").config();
const {
    // META_PASSWORD,
    EMAIL_USER,
    EMAIL_PASS,
} = process.env;

const nodemailerConfig = {
    host: "s3.thehost.com.ua",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
};

// const nodemailerConfig = {
//     host: "smtp.meta.ua",
//     port: 465,
//     secure: true,
//     auth: {
//         user: "bohdan.yashchyshyn@meta.ua",
//         pass: META_PASSWORD,
//     },
// };

module.exports = nodemailerConfig;
