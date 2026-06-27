import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI8llwqy-3BOGsJALHf3UjQdaaNnAqW8E",
  authDomain: "roamripple-7bbef.firebaseapp.com",
  projectId: "roamripple-7bbef",
  storageBucket: "roamripple-7bbef.firebasestorage.app",
  messagingSenderId: "758653223920",
  appId: "1:758653223920:web:cac703462d76b0b6ddd335",
  measurementId: "G-X4TN1HVYXL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);