require("dotenv").config();
const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "s3.thehost.com.ua",
    port: 465,
    secure: true,
    auth: {
        user: "admin@pilo-shop.com.ua",
        pass: "Zanuda2015",
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
