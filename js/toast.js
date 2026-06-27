const toast = document.getElementById("toast");

function showToast(message, type = "success") {

    toast.textContent = message;

    toast.className = `toast show ${type}`;

    setTimeout(() => {

        toast.className = "toast";

    },3000);

}

window.showToast = showToast;