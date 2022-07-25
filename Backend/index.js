/**
 * chat module
 *
 * @author Haseeb Zahid
 *
 * : 
 */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");



dotenv.config()


const link = process.env.MONGO_URL

mongoose
    .connect(link, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

// middleWare

app.use(express.json());

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/message", messageRoute)


app.listen(5000, () => {
    console.log('backend server listening on port 5000 ...');
});