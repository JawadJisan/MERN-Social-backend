const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require('cors');
const dotenv = require('dotenv');


// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
    res.send("Route is working!!")
})

const user = require("./routes/userRoute.js");
const posts = require("./routes/postRoute.js");


app.use("/api/v1", user);
app.use("/api/v1", posts);




module.exports = app