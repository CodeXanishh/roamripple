// =========================
// MODAL ELEMENTS
// =========================
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");

const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const dateInput = document.getElementById("visit-date");
const bookBtn = document.getElementById("book-btn");

// =========================
// REAL PHOTO FETCHER (WIKIPEDIA)
// =========================
async function getRealImage(placeName) {

    if (placeName === "Manali") {
        placeName = "Manali, Himachal Pradesh";
    }

    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles=${encodeURIComponent(placeName)}`;

        const res = await fetch(url);
        const data = await res.json();

        const pages = data.query.pages;
        const page = pages[Object.keys(pages)[0]];

        return page.original
            ? page.original.source
            : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

    } catch {
        return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }
}


// =========================
// DESTINATIONS WITH REAL PHOTOS
// =========================
const destinations = {
    "Goa": {
        desc: "Golden beaches breathing under moonlit waves.",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.427822225653!2d73.75759387404838!3d15.544093954352955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc1bdbde34287%3A0xafb9e5f8e454c52f!2sCalangute%20Beach!5e0!3m2!1sen!2sin!4v1707050343421!5m2!1sen!2sin",
        route: "https://www.google.com/maps/dir/?api=1&destination=Calangute+Beach+Goa"
    },

    "Manali": {
        desc: "Snow peaks shining quietly in the night breeze.",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3425.5814661091!2d77.1872888740578!3d32.24318797385624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390487ce472151f3%3A0x35cf51e8a4f26838!2sMall%20Road%20Manali!5e0!3m2!1sen!2sin!4v1707050512374!5m2!1sen!2sin",
        route: "https://www.google.com/maps/dir/?api=1&destination=Mall+Road+Manali"
    },

    "Rishikesh": {
        desc: "The river hums ancient stories beneath the stars.",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3487.073127735355!2d78.32093987402642!3d30.124967174891675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390917ff7ae77f5b%3A0x7cc184f475fbcb8a!2sLaxman%20Jhula!5e0!3m2!1sen!2sin!4v1707050593409!5m2!1sen!2sin",
        route: "https://www.google.com/maps/dir/?api=1&destination=Lakshman+Jhula+Rishikesh"
    }
};

// =========================
// SEARCH AUTOCOMPLETE (Improved – Google Maps Style)
// =========================
const searchInput = document.getElementById("search-input");
const suggestionsBox = document.getElementById("suggestions");

if (!searchInput || !suggestionsBox) {
    console.error("Search elements not found");
} else {

searchInput.addEventListener("input", async () => {
    let text = searchInput.value.trim();

    if (text.length < 2) {
        suggestionsBox.style.display = "none";
        return;
    }

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&q=${text}`
        );
        const results = await response.json();

        suggestionsBox.innerHTML = "";
        suggestionsBox.style.display = "block";

        if (!results.length) {
            suggestionsBox.innerHTML = "<div class='suggestion-item'>No matches found</div>";
            return;
        }

        results.forEach(place => {
            // Create full Google Maps–like location name
            let display = "";
            if (place.address.city) display += place.address.city;
            else if (place.address.town) display += place.address.town;
            else if (place.address.village) display += place.address.village;
            else display += place.display_name.split(",")[0];

            if (place.address.state) display += `, ${place.address.state}`;
            if (place.address.country) display += `, ${place.address.country}`;

            let div = document.createElement("div");
            div.classList.add("suggestion-item");
            div.textContent = display;

            div.onclick = () => {
                searchInput.value = display;
                openPlaceFromSearch(place);
                suggestionsBox.style.display = "none";
            };

            suggestionsBox.appendChild(div);
        });
    } catch (err) {
        console.error("Error fetching suggestions:", err);
        suggestionsBox.innerHTML = "<div class='suggestion-item'>Error loading results</div>";
    }
});

// =========================
// ENTER SEARCH
// =========================
searchInput.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter") return;
    const text = searchInput.value.trim();
    if (!text) return;

    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${text}`
    );
    const data = await res.json();
    if (!data.length) return showToast("No location found", "warning");
    openPlaceFromSearch(data[0]);
});

// =========================
// OPEN MODAL FROM SEARCH
// =========================
async function openPlaceFromSearch(place) {
    modal.style.display = "flex";

    const name = place.display_name.split(",")[0];
    modalTitle.innerText = name;
    modalDesc.innerText = place.type || "Searched Location";

    // Real Wikipedia photo
    modalImg.src = await getRealImage(name);

    document.getElementById("map-frame").src =
        `https://www.google.com/maps?q=${place.lat},${place.lon}&z=14&output=embed`;

    fetch(`https://wttr.in/${name}?format=3`)
.then(r => r.text())
.then(t => {
    const weatherBox = document.getElementById("weather-box");
    if (weatherBox) {
        weatherBox.innerText = t;
    }
});
}
}
// =========================
// CARD CLICKS WITH REAL PHOTOS
// =========================
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", async () => {
        const place = card.querySelector("h2").innerText;

        // Real photo
        modalImg.src = await getRealImage(place);

        modalTitle.innerText = place;
        modalDesc.innerText = destinations[place].desc;
        document.getElementById("map-frame").src = destinations[place].map;
fetch(`https://wttr.in/${place}?format=3`)
.then(r => r.text())
.then(weather => {
    const weatherBox = document.getElementById("weather-box");
    if (weatherBox) {
        weatherBox.innerText = weather;
    }
});

modal.style.display = "flex";
    });
});

// =========================
// CLOSE MODAL
// =========================
closeBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

// =========================
// BOOK TRIP
// =========================
bookBtn.addEventListener("click", () => {
    const place = modalTitle.innerText;
    const date = dateInput.value;

    if (!date) return showToast("Please select a date", "warning");

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push({ place, date });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    showToast(`Trip to ${place} booked successfully!`);
    modal.style.display = "none";
});

// =========================
// BASIC AI CHAT
// =========================
const aiInput = document.getElementById("ai-input");
const aiSend = document.getElementById("ai-send");
const aiChat = document.getElementById("ai-chat");

if(aiInput && aiSend && aiChat) {

aiSend.addEventListener("click", () => {
    let msg = aiInput.value.trim();
    if (!msg) return;

    aiChat.innerHTML += `<div class="ai-msg">You: ${msg}</div>`;
    aiInput.value = "";
    aiChat.scrollTop = aiChat.scrollHeight;

    const lower = msg.toLowerCase();
    let reply = "";

    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        reply = "Hello traveler. Tell me what kind of place you like: mountains, beaches or adventure?";
    } else if (lower.includes("mountain") || lower.includes("hill")) {
        const mountainPlaces = [
            "Manali – perfect for calm snowy vibes",
            "Darjeeling – tea gardens and cool climate",
            "Kedarnath – spiritual peaks",
            "Shimla – peaceful hills",
            "Leh Ladakh – raw adventure in the mountains"
        ];
        reply = "Here are mountain places you might enjoy. " +
                mountainPlaces[Math.floor(Math.random()*mountainPlaces.length)];
    } else if (lower.includes("beach") || lower.includes("sea") || lower.includes("ocean")) {
        const beachPlaces = [
            "Goa – beaches with nightlife",
            "Pondicherry – clean shores with French vibes",
            "Andaman – crystal blue water",
            "Gokarna – quiet beaches",
            "Lakshadweep – island beauty"
        ];
        reply = "Try visiting. " +
                beachPlaces[Math.floor(Math.random()*beachPlaces.length)];
    } else if (lower.includes("adventure")) {
        const adventure = [
            "Rishikesh – rafting and bungee",
            "Ladakh – high altitude thrill",
            "Spiti Valley – rugged landscapes",
            "Auli – skiing wonder",
            "Andaman – scuba diving"
        ];
        reply = "Here is an adventure suggestion. " +
                adventure[Math.floor(Math.random()*adventure.length)];
    } else if (lower.includes("cold") || lower.includes("snow")) {
        reply = "Try Manali, Shimla, Auli or Kashmir";
    } else if (lower.includes("hot") || lower.includes("warm")) {
        reply = "Warm places? Goa, Rajasthan deserts or Pondicherry are great";
    } else if (
        lower.includes("best place") ||
        lower.includes("where should i go") ||
        lower.includes("suggest")
    ) {
        reply = "Tell me what type of place you prefer. Mountains, beaches or adventure?";
    } else {
        const generic = [
            "Tell me what type of place you like. Mountains, beaches or adventure?",
            "I can suggest places. Tell me your mood.",
            "Looking for somewhere new? Prefer cold, hot, quiet or adventurous places?"
        ];
        reply = generic[Math.floor(Math.random()*generic.length)];
    }

    aiChat.innerHTML += `<div class="ai-msg">${reply}</div>`;
    aiChat.scrollTop = aiChat.scrollHeight;
});

// ENTER to send
aiInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        aiSend.click();
    }
});
}
// =========================
// AI PANEL TOGGLE
// =========================
document.addEventListener("DOMContentLoaded", () => {

    const openAI = document.getElementById("open-ai");
    const aiPanel = document.getElementById("ai-panel");

    if (openAI && aiPanel) {

        openAI.addEventListener("click", () => {
            aiPanel.classList.toggle("active");
        });

    }

});

const heroSearchBtn = document.getElementById("hero-search-btn");

if (heroSearchBtn) {

    heroSearchBtn.addEventListener("click", () => {

        const searchInput = document.getElementById("search-input");

        if (!searchInput) return;

        const search = searchInput.value.trim();

        if (search) {

            window.location.href =
                `pages/explore.html?search=${encodeURIComponent(search)}`;

        }

    });

}
const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}