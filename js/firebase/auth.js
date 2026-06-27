import { auth } from "./firebase-config.js";
import {
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut
} 
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
function resetButton(button, text) {
    if (!button) return;
    button.disabled = false;
    button.innerHTML = text;
}

/* ================= LOGIN ================= */
const loginBtn = document.getElementById("login-btn");

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Disable button when request starts
        loginBtn.disabled = true;
        loginBtn.innerHTML = "Logging in...";

        if (!email || !password) {
            showToast("Please enter your email and password.", "warning");

            resetButton(loginBtn, "Login");
            return;
        }

        try {

            await signInWithEmailAndPassword(auth, email, password);

            showToast("Login Successful!");

            window.location.href = "../index.html";

        } catch (error) {

            showToast(error.message, "error");

        } finally {

            // Runs whether login succeeds or fails
            resetButton(loginBtn, "Login");

        }

    });

}

/* ================= SIGNUP ================= */

const signupBtn = document.getElementById("signup-btn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    signupBtn.disabled = true;
    signupBtn.innerHTML = "Creating Account...";


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

   if (!name || !email || !password) {
    showToast("Please fill in all fields.", "warning");
    resetButton(signupBtn, "Sign Up");
    return;
    }

    try {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(userCredential.user, {
        displayName: name
    });

    showToast("Account Created Successfully!");

    window.location.href = "login.html";

} catch (error) {

    showToast(error.message, "error");

} finally {

    resetButton(signupBtn, "Sign Up");

}
});
}

const googleBtn = document.getElementById("google-login");

if (googleBtn) {

    googleBtn.addEventListener("click", async () => {

        googleBtn.disabled = true;
        googleBtn.innerHTML = "Signing in...";

        const provider = new GoogleAuthProvider();

        try {

            await signInWithPopup(auth, provider);

            showToast("Google Login Successful!");

            window.location.href = "../index.html";

        } catch (error) {

            showToast(error.message, "error");

        } finally {

            resetButton(googleBtn, "Continue with Google");

        }

    });

}


// Keep user logged in
onAuthStateChanged(auth, (user) => {

    const userName = document.getElementById("user-name");
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
    const logoutBtn = document.getElementById("logout-btn");
    const tripBtn = document.getElementById("trip-btn");

    if (user) {

        if (userName)
            userName.textContent = `👋 ${user.displayName || user.email}`;

        if (loginLink) loginLink.style.display = "none";
        if (signupLink) signupLink.style.display = "none";

        if (logoutBtn) logoutBtn.style.display = "inline-block";
        if (tripBtn) tripBtn.style.display = "inline-block";

    } else {

        if (userName)
            userName.textContent = "";

        if (loginLink) loginLink.style.display = "inline-block";
        if (signupLink) signupLink.style.display = "inline-block";

        if (logoutBtn) logoutBtn.style.display = "none";
        if (tripBtn) tripBtn.style.display = "none";

    }

});
// Logout
console.log("auth.js loaded");
const logoutBtn = document.getElementById("logout-btn");
console.log(logoutBtn);

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);

            showToast("Logged out successfully!");

            window.location.href = "pages/login.html";

        } catch (error) {
            showToast(error.message, "error");
        }
    });
}
