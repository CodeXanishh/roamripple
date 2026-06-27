console.log("contact.js loaded");


emailjs.init("rp35XnAgG-wWuACsw");

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const params = {
        name: document.getElementById("contact-name").value,
        email: document.getElementById("contact-email").value,
        message: document.getElementById("contact-message").value
    };

    emailjs.send(
        "service_7l7yoeg",
        "template_bc44hhp",
        params
    )
    .then(() => {
        showToast("✅ Message sent successfully!");
        contactForm.reset();
    })
    .catch((error) => {
        console.error(error);
        showToast("Failed to send message.","error");
    });
});