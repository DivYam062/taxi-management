//Local storage
let activeUsers=JSON.parse(localStorage.getItem("user-details")) || [];
let historyData = JSON.parse(localStorage.getItem("history")) || [];
let usersBook = JSON.parse(localStorage.getItem("active-booking")) || [];
let activeDrivers = JSON.parse(localStorage.getItem("driver-details")) || [];
let adminLog = JSON.parse(localStorage.getItem("adminLog"));

// Active Customer
let activeCustomer = document.getElementById("active-customer");
activeCustomer.innerText="";
activeCustomer.innerText=activeUsers.length;

//Active Bookings
let activeBooking = document.getElementById("active-booking");
let activeBook = historyData.filter(data => data.status!="cancel" && data.status!="completed");
localStorage.setItem("active-booking", JSON.stringify(activeBook));
activeBooking.innerText="";
activeBooking.innerText=usersBook.length;

//Active Drivers
let activeDriver = document.getElementById("active-driver");
activeDriver.innerText="";
let arr=activeDrivers.filter(driver=>driver.carAssigned=="none");
activeDriver.innerText=arr.length;

//admin Log
if(adminLog && adminLog.length!=0){
    let nameEle = document.getElementById("name");
    let na = document.getElementById("na");
    let a = adminLog.name.toUpperCase().split(" ");
    nameEle.textContent=a[0];
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