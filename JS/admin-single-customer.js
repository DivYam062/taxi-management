let customerDetails = JSON.parse(localStorage.getItem("single-customer"));

if (customerDetails) {
    let cardCustomer = document.querySelector(".single-customer");
    cardCustomer.innerHTML = `
        <div class="img">
            <i class="fa-solid fa-user"></i>
        </div>
        <div class="text">
            <h1>${customerDetails.uname}</h1>
            <p><span>Phone number: </span>${customerDetails.number}</p>
            <p><span>Email: </span>${customerDetails.email}</p>
            <p><span>Pickup Location: </span>${customerDetails.address}</p>
            <p><span>Destination: </span>${customerDetails.locName}</p>
            <p><span>Distance: </span>${customerDetails.locDis}Km</p>
            <p><span>Car Booked: </span>${customerDetails.carName}</p>
            <p><span>Total Payment:</span> ₹${customerDetails.carPrice * customerDetails.locDis}</p>
            <button class="btn1" onclick="window.location.href='./admin-customers.html'">GO BACK</button>
            <button class="btn2">Assign Driver</button>
        </div>
    `;

    let back = cardCustomer.querySelector(".img");
    if (customerDetails.status == "pending") {
        back.style.background = "yellow";
    } else if (customerDetails.status == "cancel") {
        back.style.background = "red";
    } else if (customerDetails.status == "completed") {
        back.style.background = "cyan";
    } else {
        back.style.background = "green";
    }

    if (customerDetails.status == "assigned" || customerDetails.status == "completed") {
        cardCustomer.querySelector(".btn2").style.display = "none";
    } else {
        cardCustomer.querySelector(".btn2").addEventListener("click", handleAssign);
    }
}

let drivers = JSON.parse(localStorage.getItem("driver-details")) || [];
let driverData = drivers.filter(dri => dri.carAssigned == "none");

function displayDrivers(data) {
    let body = document.querySelector(".tbody");
    let div = document.querySelector(".show");
    body.innerHTML = "";

    if (data.length != 0) {
        div.style.display = "none";
        data.forEach(driver => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${driver.driverName}</td>
                <td>${driver.email}</td>
                <td>${driver.number}</td>
                <td class="status">
                    <button class="pointer"></button>
                </td>
                <td class="action">
                    <i class="fa-solid fa-circle-check view"></i>
                </td>
            `;

            tr.querySelector(".view").addEventListener("click", () => handleAssignDriver(driver));

            body.appendChild(tr);

            let btn = tr.querySelector(".status>button");
            if (driver.carAssigned != "none") {
                btn.innerText = "ASSIGNED";
                btn.classList.add("btn-active");
            } else {
                btn.innerText = "NOT ASSIGNED";
                btn.classList.add("btn-notActive");
            }
        });
    } else {
        div.style.display = "block";
    }
}

displayDrivers(driverData);

function handleAssign() {
    let box = document.querySelector(".tableOfDrivers");
    box.style.display = "block";
}

function handleAssignDriver(driver) {
    customerDetails.status = "assigned";
    customerDetails.driverName = driver.driverName;
    customerDetails.driverNumber = driver.number;
    driver.carAssigned = "assigned";

    localStorage.setItem("single-customer", JSON.stringify(customerDetails));
    localStorage.setItem("driver-details", JSON.stringify(drivers));

    let history = JSON.parse(localStorage.getItem("history")) || [];
    let customerIndex = history.findIndex(c =>c.carName === customerDetails.carName && c.locName === customerDetails.locName && c.status==="pending" && c.bookingDate===customerDetails.bookingDate && c.address === customerDetails.address && c.bookingDay === customerDetails.bookingDay);
    if (customerIndex !== -1) {
        history[customerIndex] = customerDetails;
        localStorage.setItem("history", JSON.stringify(history));
    }

    location.reload();
}

let driverFind = JSON.parse(localStorage.getItem("driver-details")) || [];
let driverAssigned = driverFind.find(dri => (customerDetails.status=="assigned" || customerDetails.status=="completed") && customerDetails.driverName == dri.driverName && customerDetails.driverNumber == dri.number);

if (driverAssigned) {
    let ass = document.querySelector(".ass");
    ass.innerHTML = `
        <div class="img2">
            <img src="../Images/${driverAssigned.image}">
        </div>
        <div class="text">
            <h1>${driverAssigned.driverName}</h1>
            <p><span>Phone number: </span>${driverAssigned.number}</p>
            <p><span>Email: </span>${driverAssigned.email}</p>
            <p><span>Booking Date: </span>${customerDetails.bookingDate}</p>
            <p><span>Number of days: </span>${customerDetails.bookingDay}</p>
            <p><span>Car: </span>${customerDetails.carName}</p>
        </div>
    `;
} else {
    console.log("No assigned driver found");
}

if(customerDetails.status == "assigned" || customerDetails.status == "completed"){
    document.querySelector(".name-div").style.display="block";
}

//admin Log
let adminLog = JSON.parse(localStorage.getItem("adminLog"));

if(adminLog && adminLog.length!=0){
    let nameEle = document.getElementById("name");
    let na = document.getElementById("na");
    let a = adminLog.name.toUpperCase().split(" ");
    nameEle.textContent=a[0];
    nameEle.removeAttribute("href");
    na.style.backgroundColor="rgb(255, 191, 0)";
    na.style.border="none";

    let logEle = document.getElementById("log");
    logEle.removeAttribute("href");
    logEle.textContent = "Logout";

    logEle.addEventListener("click",function(){
        localStorage.removeItem("adminLog");
        na.style.backgroundColor="white";
        na.style.border="2px solid black";
        window.location.href="./admin-login.html";
    });
}else{
    let nameEle = document.getElementById("name");
    nameEle.addEventListener("click",window.location.href="./admin-signup.html");
}