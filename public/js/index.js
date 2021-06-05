const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");
const msg = document.querySelector(".message");
const nameInput = document.querySelector("[name=name");
const emailInput = document.querySelector("[name=email");
const messageInput = document.querySelector("[name=message");
const button = document.querySelector(".contact-btn");

function handleForm(event) {
	event.preventDefault();
	sendMessage();
}
const form = document.querySelector("form");
form.addEventListener("submit", handleForm);

// open and close sidenav
navToggle.addEventListener("click", () => {
	document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		document.body.classList.remove("nav-open");
	});
});

// function for making asynchronous request from button
const sendMessage = () => {
	const name = nameInput.value;
	const email = emailInput.value;
	const message = messageInput.value;
	if (name != "" && (email != "") & (message != "")) {
		button.innerHTML = "Sending...";
		fetch("/sendmessage", {
			method: "POST",
			body: JSON.stringify({
				name: name,
				email: email,
				message: message,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => {
			button.innerHTML = "Send Message";
			nameInput.value = "";
			emailInput.value = "";
			messageInput.value = "";
			msg.style.display = "inline-block";
			msg.innerHTML = "<span>&#10003;</span> Thank You! Email has been sent.";
		});
	}
};

// animations
gsap.registerPlugin(ScrollTrigger);
var tl = gsap.timeline();

tl.from(".hero-content", {
	y: "-30%",
	opacity: 0,
	duration: 2,
	ease: Power4.easeOut,
});
tl.from(
	".stagger1",
	{
		opacity: 0,
		y: -50,
		stagger: 0.3,
		ease: Power4.easeOut,
		duration: 2,
	},
	"-=1.5"
);
tl.from(
	".hero-design",
	{
		opacity: 0,
		y: 50,
		ease: Power4.easeOut,
		duration: 1,
	},
	"-=2"
);

gsap.from(".square-anim", {
	stagger: 0.2,
	scale: 0.1,
	duration: 1,
	ease: Back.easeOut.config(1.7),
});

gsap.from(".transition2", {
	scrollTrigger: {
		trigger: ".transition2",
		start: "top bottom",
	},
	y: 50,
	opacity: 0,
	duration: 1.2,
	stagger: 0.3,
});

gsap.from(".transition3", {
	scrollTrigger: {
		trigger: ".transition3",
		start: "top center",
	},
	y: 50,
	opacity: 0,
	duration: 1.2,
	stagger: 0.6,
});
