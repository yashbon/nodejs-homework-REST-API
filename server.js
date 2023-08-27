const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
    "mongodb+srv://yashbon:phonebook@cluster0.ohfd8dg.mongodb.net/phonebook?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(3000, () => {
            console.log("Server running. Use our API on port: 3000");
        });
        console.log("Databse connect success");
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
