const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.SENDGRID_KEY,
		},
	})
);

const mailOptions = {
	from: "giorgos@giourmetakis.gr",
	to: "giourmetakis00@gmail.com",
	subject: "Message from giourmetakis.gr",
	text: "I would like to get in touch with you",
};

transporter.sendMail(mailOptions, function (err, data) {
	if (err) {
		console.log("Error occurs.");
	} else {
		console.log("Message sent.");
	}
});
