const loader = document.getElementById("loader");

function showLoader() {
    if (loader) {
        loader.classList.add("active");
    }
}

function hideLoader() {
    if (loader) {
        loader.classList.remove("active");
    }
}

window.showLoader = showLoader;
window.hideLoader = hideLoader;