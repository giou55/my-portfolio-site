const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
// 	res.render("index");
// });

app.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

// app.get("/test", (req, res) => {
// 	res.render("test");
// });

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
