// Popular places list
import { places } from "./data.js";
import { getRealImage, getWeather } from "./api.js";
import { saveBooking } from "./bookingService.js";


// Function to get real image from Wikipedia
// async function getRealImage(placeName) {
//     const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles=${placeName}`;
//     const res = await fetch(url);
//     const data = await res.json();

//     const pages = data.query.pages;
//     const page = pages[Object.keys(pages)[0]];

//     return page.original
//         ? page.original.source
//         : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
// }

// Show cards on page
async function loadPlaces() {
    const container = document.getElementById("explore-list");

    for (let place of places) {
    const img = await getRealImage(place.name);

        container.innerHTML += `
    <div class="card">
        <img src="${img}" class="card-img">

        <div class="card-price">${place.price}</div>

        <h2>${place.name}</h2>
    </div>
`;
 }

    attachCardClicks();
}

loadPlaces();

// Modal elements
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const bookBtn = document.getElementById("book-btn");
const dateInput = document.getElementById("visit-date");

// On clicking a place
function attachCardClicks() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", async () => {
            const place = card.querySelector("h2").innerText;

            modal.style.display = "flex";

            modalTitle.innerText = place;
            modalDesc.innerText = "A beautiful destination full of stories.";

            modalImg.src = await getRealImage(place);

            document.getElementById("map-frame").src =
                `https://www.google.com/maps?q=${place}&z=12&output=embed`;

           const weather = await getWeather(place);
           document.getElementById("weather-box").innerText = weather;
        });
    });
}

// Close modal
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

// Booking
bookBtn.addEventListener("click", () => {
    const place = modalTitle.innerText;
    const date = dateInput.value;

    if (!date) return alert("Select a date first");

    saveBooking(place, date);

alert(`Trip to ${place} booked successfully!`);
    modal.style.display = "none";
});
