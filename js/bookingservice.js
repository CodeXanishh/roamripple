export function getBookings() {
    return JSON.parse(localStorage.getItem("bookings")) || [];
}

export function saveBooking(place, date) {
    const bookings = getBookings();

    bookings.push({
        place,
        date,
        bookedAt: new Date().toISOString()
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));
}

export function deleteBooking(index) {
    const bookings = getBookings();

    bookings.splice(index, 1);

    localStorage.setItem("bookings", JSON.stringify(bookings));
}