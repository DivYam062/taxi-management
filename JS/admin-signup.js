// Sign-up script
let adminName = document.getElementById("name");
let number = document.getElementById("number");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let rePass = document.getElementById("re-pass");
let btn = document.getElementById("signup-btn");

btn.addEventListener("click", handleReg);

function handleReg(e) {
    e.preventDefault();
    if (adminName.value.length == 0) {
        showAlert("ALERT: Please enter your name", "red");
    } else if (number.value.length == 0) {
        showAlert("ALERT: Please enter your number", "red");
    } else if (number.value.length != 10) {
        showAlert("ALERT: Please enter valid phone number", "red");
    } else if (email.value.length == 0) {
        showAlert("ALERT: Please enter your email", "red");
    } else if (!email.value.includes('@') || !email.value.includes('.')) {
        showAlert("ALERT: Please enter valid email", "red");
    } else if (pass.value.length == 0) {
        showAlert("ALERT: Please set your password", "red");
    } else if (rePass.value.length == 0) {
        showAlert("ALERT: Please enter confirm password", "red");
    } else if (pass.value != rePass.value) {
        showAlert("ALERT: Password not match", "red");
    } else {
        loadData(adminName.value, number.value, email.value, pass.value, rePass.value);
    }
}

function showAlert(message, color) {
    let alertDiv = document.getElementById("alert");
    let alertMsg = document.createElement("p");
    alertMsg.style.color = color;
    alertMsg.innerText = message;
    alertDiv.appendChild(alertMsg);
    setTimeout(() => {
        alertDiv.removeChild(alertMsg);
    }, 2000);
}

async function loadData(adminName, number, email, pass, rePass) {
    let arr = JSON.parse(localStorage.getItem("admin-details")) || [];
    let adminExists = arr.some(admin => admin.number === number || admin.email === email);

    if (adminExists) {
        showAlert("ALERT: User with this number or email already exists!", "red");
    } else {
        let obj = {
            adminName: adminName,
            number: number,
            email: email,
            pass: pass,
        };
        arr.push(obj);
        localStorage.setItem("admin-details", JSON.stringify(arr));
        showAlert("Registration successful!", "green");
        setTimeout(() => {
            window.location.href = "./admin-login.html";
        }, 1000);
        adminName.value = "";
        number.value = "";
        email.value = "";
        pass.value = "";
        rePass.value = "";
    }
}

// Admin log
let adminLog = JSON.parse(localStorage.getItem("adminLog"));

if (adminLog && adminLog.length != 0) {
    let nameEle = document.getElementById("name");
    let na = document.getElementById("na");
    let loc1 = document.getElementById("dashboard-link");
    let loc2 = document.getElementById("drivers-link");
    let loc3 = document.getElementById("customers-link");
    let loc4 = document.getElementById("home-link");

    loc1.addEventListener("click", () => window.location.href = "./admin-dashboard.html");
    loc2.addEventListener("click", () => window.location.href = "./admin-drivers.html");
    loc3.addEventListener("click", () => window.location.href = "./admin-customers.html");
    loc4.addEventListener("click", () => window.location.href = "../index.html");

    let a = adminLog.name.toUpperCase().split(" ");
    nameEle.textContent = a[0];
    nameEle.removeAttribute("href");
    na.style.backgroundColor = "rgb(255, 191, 0)";
    na.style.border = "none";

    let logEle = document.getElementById("log");
    logEle.removeAttribute("href");
    logEle.textContent = "Logout";

    logEle.addEventListener("click", function () {
        localStorage.removeItem("adminLog");
        na.style.backgroundColor = "white";
        na.style.border = "2px solid black";
        window.location.href = "./admin-login.html";
    });
} else {
    let loc1 = document.getElementById("dashboard-link");
    let loc2 = document.getElementById("drivers-link");
    let loc3 = document.getElementById("customers-link");
    let loc4 = document.getElementById("home-link");

    loc1.addEventListener("click", () => window.location.href = "./admin-login.html");
    loc2.addEventListener("click", () => window.location.href = "./admin-login.html");
    loc3.addEventListener("click", () => window.location.href = "./admin-login.html");
    loc4.addEventListener("click", () => window.location.href = "../index.html");
}
