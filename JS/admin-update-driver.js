let driverDetails = JSON.parse(localStorage.getItem("single-driver"));

let driverName=document.getElementById("name");
let image=document.getElementById("img");
let number=document.getElementById("number");
let email=document.getElementById("email");
let address=document.getElementById("address");
let dob=document.getElementById("dob");
let panNumber=document.getElementById("pan-number");
let panCard=document.getElementById("img1");
let licenceNumber=document.getElementById("licence-number")
let drivingLicence=document.getElementById("img2");
let accNumber=document.getElementById("acc-number");
let btn=document.getElementById("update-btn");
let inputImage=document.getElementById("image");
let inputPan=document.getElementById("pan");
let inputLicence=document.getElementById("licence");

if(driverDetails){
    driverName.value = driverDetails.driverName || '';
    image.src = `../Images/${driverDetails.image}` || '';
    number.value = driverDetails.number || '';
    email.value = driverDetails.email || '';
    address.value = driverDetails.address || '';
    dob.value = driverDetails.dob || '';
    panNumber.value = driverDetails.panNumber || '';
    panCard.src = `../Images/${driverDetails.panCard}` || '';
    licenceNumber.value = driverDetails.licenceNumber || '';
    drivingLicence.src = `../Images/${driverDetails.drivingLicence}` || '';
    accNumber.value = driverDetails.accNumber || '';
}

inputImage.addEventListener("change", function() {
    if (inputImage.files && inputImage.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            image.src = e.target.result;
        }
        reader.readAsDataURL(inputImage.files[0]);
    }
});

inputPan.addEventListener("change", function() {
    if (inputPan.files && inputPan.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            panCard.src = e.target.result;
        }
        reader.readAsDataURL(inputPan.files[0]);
    }
});

inputLicence.addEventListener("change", function() {
    if (inputLicence.files && inputLicence.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            drivingLicence.src = e.target.result;
        }
        reader.readAsDataURL(inputLicence.files[0]);
    }
});

btn.addEventListener("click",handleDetails);

function handleDetails(e){
    e.preventDefault();
    if(driverName.value.length==0){
        showAlert("ALERT: Please enter name","red");
    }
    else if(number.value.length==0){
        showAlert("ALERT: Please enter number","red");
    }
    else if(number.value.length!=10){
        showAlert("ALERT: Please enter valid phone number","red");
    }
    else if(email.value.length==0){ 
        showAlert("ALERT: Please enter email","red");
    }
    else if(!email.value.includes('@'&&'.')){
        showAlert("ALERT: Please enter valid email","red");
    }
    else if(address.value.length==0){ 
        showAlert("ALERT: Please enter address","red");
    }
    else if(dob.value.length==0){ 
        showAlert("ALERT: Please enter date of birth","red");
    }
    else if(!/^\d{1,2}-\d{1,2}-\d{4}$/.test(dob.value)){
        showAlert("ALERT: Enter date properly (DD-MM-YYYY)","red");
    }
    else if(panNumber.value.length==0){ 
        showAlert("ALERT: Please enter pan-card number","red");
    }
    else if(licenceNumber.value.length==0){ 
        showAlert("ALERT: Please enter licence number","red");
    }
    else if(accNumber.value.length==0){
        showAlert("ALERT: Please enter your account number","red");
    }
    else if(accNumber.value.length!=12){
        showAlert("ALERT: Please enter correct account number","red");
    }
    else{
        loadData(driverName.value,inputImage.files[0]?.name || driverDetails.image,number.value,email.value,address.value,dob.value,panNumber.value,inputPan.files[0]?.name || driverDetails.panCard,licenceNumber.value,inputLicence.files[0]?.name || driverDetails.drivingLicence,accNumber.value);
    }
}

function showAlert(message,color){
    let alertDiv= document.getElementById("alert");
    let alertMsg=document.createElement("p");
    alertMsg.style.color=color;
    alertMsg.innerText=message;
    alertDiv.appendChild(alertMsg);
    setTimeout(()=>{
        alertDiv.removeChild(alertMsg);
    },2000);
}

async function loadData(driverName,image,number,email,address,dob,panNumber,panCard,licenceNumber,drivingLicence,accNumber){
    let arr=JSON.parse(localStorage.getItem("driver-details")) || [];
    let driverIndex = arr.findIndex(driver => driver.number === number || driver.email === email);
     
    if(driverIndex !== -1){
        arr[driverIndex]={
            driverName:driverName,
            image: `${image}`,
            number:number,
            email:email,
            address:address,
            dob:dob,
            panNumber:panNumber,
            panCard:`${panCard}`,
            licenceNumber:licenceNumber,
            drivingLicence:`${drivingLicence}`,
            accNumber:accNumber,
            carAssigned:"none",
        };
        localStorage.setItem("driver-details",JSON.stringify(arr));
        showAlert("Driver update sucessful !","green");
    }
    setTimeout(()=>{
        window.location.href="./admin-drivers.html";
    },1000);
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