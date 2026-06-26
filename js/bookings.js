// Load bookings from localStorage
import { getBookings } from "./bookingService.js";

const bookings = getBookings();

const listContainer = document.getElementById("booking-list");
const clearBtn = document.getElementById("clear-all");

// Render all bookings
function loadBookings() {
    listContainer.innerHTML = "";

    if (bookings.length === 0) {
        listContainer.innerHTML = `
            <p style="color:#9ca3af; font-size:16px; text-align:center;">
                No bookings yet...
            </p>
        `;
        return;
    }

    bookings.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("booking-card");

        card.innerHTML = `
            <div class="booking-info">
                <h3>${item.place}</h3>
                <p>Date: ${item.date}</p>
            </div>

            <button class="delete-btn" onclick="deleteBooking(${index})">
                Remove
            </button>
        `;

        listContainer.appendChild(card);
    });
}

// Delete a single booking
function deleteBooking(index) {
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    loadBookings();
}

// Clear all bookings
clearBtn.addEventListener("click", () => {
    if (confirm("Clear all bookings?")) {
        bookings = [];
        localStorage.setItem("bookings", JSON.stringify(bookings));
        loadBookings();
    }
});

loadBookings();
