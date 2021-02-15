const express = require("express");
var exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.SENDGRID_KEY,
		},
	})
);

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/send", (req, res) => {
	const output = `
    <h3>ΣΤΟΙΧΕΙΑ ΑΠΟΣΤΟΛΕΑ</h3> 
	<p>Όνομα: ${req.body.name}<br>Email: ${req.body.email}</p>
    <h3>ΜΗΝΥΜΑ</h3>
    <p>${req.body.message}</p>
  `;

	let mailOptions = {
		from: "giorgos@giourmetakis.gr",
		to: "giourmetakis00@gmail.com",
		subject: "Message from giourmetakis.gr",
		html: output,
	};

	return transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		res.render("home", { msg: "Email has been sent" });
	});
});

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(process.env.PORT | 3000);
