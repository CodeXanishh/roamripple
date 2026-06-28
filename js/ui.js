const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

// Mobile Menu
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navButtons = document.querySelector(".nav-buttons");

if (toggle) {

    toggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");
        navButtons.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            navButtons.classList.remove("active");

        });

    });

}
// Reveal Animation
const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            section.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealSections);

// Run once when page loads
revealSections();
