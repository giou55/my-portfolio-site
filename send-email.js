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

const output = "Hello";

transporter.sendMail({
	from: "giorgos@giourmetakis.gr",
	to: "giourmetakis00@gmail.com",
	subject: "Message from giourmetakis.gr",
	html: output,
});
