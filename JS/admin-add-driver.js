let driverName=document.getElementById("name");
let image=document.getElementById("image");
let number=document.getElementById("number");
let email=document.getElementById("email");
let address=document.getElementById("address");
let dob=document.getElementById("dob");
let panNumber=document.getElementById("pan-number");
let panCard=document.getElementById("pan");
let licenceNumber=document.getElementById("licence-number")
let drivingLicence=document.getElementById("licence");
let accNumber=document.getElementById("acc-number");
let btn=document.getElementById("add-btn");

btn.addEventListener("click",handleDetails);

function handleDetails(e){
    e.preventDefault();
    if(driverName.value.length==0){
        showAlert("ALERT: Please enter name","red");
    }
    else if(image.value.length==0){
        showAlert("ALERT: Please enter image","red");
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
    else if(panCard.value.length==0){
        showAlert("ALERT: Please enter pan card picture","red");
    }
    else if(licenceNumber.value.length==0){ 
        showAlert("ALERT: Please enter licence number","red");
    }
    else if(drivingLicence.value.length==0){
        showAlert("ALERT: Please enter driving licence picture","red");
    }
    else if(accNumber.value.length==0){
        showAlert("ALERT: Please enter your account number","red");
    }
    else if(accNumber.value.length!=12){
        showAlert("ALERT: Please enter correct account number","red");
    }
    else{
        loadData(driverName.value,image.files[0].name,number.value,email.value,address.value,dob.value,panNumber.value,panCard.files[0].name,licenceNumber.value,drivingLicence.files[0].name,accNumber.value);
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
    let driverExists = arr.some(driver => driver.number === number || driver.email === email);
     
    if(driverExists){
        showAlert("ALERT: User with this number or email already exists!", "red");
    }
    else{
        let obj={
            driverName:driverName,
            image:`${image}`,
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
        arr.push(obj);
        localStorage.setItem("driver-details",JSON.stringify(arr));
        showAlert("Driver added sucessful !","green");
        setTimeout(()=>{
            window.location.href="./admin-drivers.html";
        },1000);
    }
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