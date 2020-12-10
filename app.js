const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key:
				"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",
		},
	})
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.post("/send", (req, res) => {
	const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

	return transporter.sendMail({
		from: "giorgos@giourmetakis.gr",
		to: "giourmetakis00@gmail.com",
		subject: "Message from giourmetakis.gr",
		html: output,
	});
});

app.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
