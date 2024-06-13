let driverDetails = JSON.parse(localStorage.getItem("single-driver"));

if(driverDetails){
    let cardDriver=document.querySelector(".single-driver");
    cardDriver.innerHTML= `
        <div class="single">
            <div class="img">
                <img src="../Images/${driverDetails.image}">
            </div>
            <div class="text">
                <h1>${driverDetails.driverName}</h1>
                <p><span>Phone number: </span>${driverDetails.number}{</p>
                <p><span>Email: </span>${driverDetails.email}</p>
                <p><span>Date Of Birth:</span> ${driverDetails.dob}</p>
                <p><span>Address: </span>${driverDetails.address}</p>
                <p><span>Driving Licence number: </span>${driverDetails.licenceNumber}</p>
                <p><span>Pan Card Number: </span>${driverDetails.panNumber}</p>
                <button class="btn1" onclick="window.location.href='./admin-drivers.html'">GO BACK</button>
                <button class="btn3">Update Details</button>
            </div>
        </div>
        <div class="cards">
            <div class="pan-card">
                <h1>Pan Card</h1>
                <div>
                    <img src="../Images/${driverDetails.panCard}" alt="">
                </div>
            </div>
            <div class="driving-licence">
                <h1>Driving Licence</h1>
                <div>
                    <img src="../Images/${driverDetails.drivingLicence}" alt="">
                </div>
            </div>
        </div>
    `;

    cardDriver.querySelector(".btn3").addEventListener("click",()=>handleUpdate(driverDetails));
}

function handleUpdate(driver){
    localStorage.removeItem("single-driver");
    localStorage.setItem("single-driver",JSON.stringify(driver));
    window.location.href='./admin-update-driver.html';
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