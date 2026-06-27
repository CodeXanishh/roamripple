import { db } from "./firebase/firebase-config.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Save booking
export async function saveBooking(userId, place, date) {

    await addDoc(collection(db, "bookings"), {
        userId,
        place,
        date,
        createdAt: serverTimestamp()
    });

}

// Get bookings of logged in user
export async function getBookings(userId) {

    const q = query(
        collection(db, "bookings"),
        where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}

// Delete booking
export async function deleteBooking(id) {

    await deleteDoc(doc(db, "bookings", id));

}