import { auth } from "./firebase/firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getBookings, deleteBooking } from "./bookingService.js";

const listContainer = document.getElementById("booking-list");
const clearBtn = document.getElementById("clear-all");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        listContainer.innerHTML = "<p>Please login first.</p>";
        return;
    }

    let bookings = await getBookings(user.uid);

    function render() {

        listContainer.innerHTML = "";

        if (bookings.length === 0) {
            listContainer.innerHTML = "<p>No bookings yet.</p>";
            return;
        }

        bookings.forEach((item) => {

            const card = document.createElement("div");
            card.className = "booking-card";

            card.innerHTML = `
                <h3>${item.place}</h3>
                <p>Date: ${item.date}</p>
                <button class="delete-btn" data-id="${item.id}">
                    Remove
                </button>
            `;

            card.querySelector(".delete-btn").onclick = async () => {

                await deleteBooking(item.id);

                bookings = bookings.filter(b => b.id !== item.id);

                render();

            };

            listContainer.appendChild(card);

        });

    }

    render();

    clearBtn.onclick = async () => {

        for (const booking of bookings) {
            await deleteBooking(booking.id);
        }

        bookings = [];

        render();

    };

});