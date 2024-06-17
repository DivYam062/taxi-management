let email=document.getElementById("email");
let number=document.getElementById("number");
let password=document.getElementById("password");
let confirm=document.getElementById("confirm");
let otpBtn=document.getElementById("otp-btn");
let submit=document.getElementById("sub-btn");

let otp = 0;
otpBtn.addEventListener("click",generateOtp);
function generateOtp(e){
    e.preventDefault();
    otp = Math.floor(1000 + Math.random() * 9000);
    alert("Your OTP is: " + otp);
}

submit.addEventListener("click",formCheck);
function formCheck(e){
    e.preventDefault();

    if(email.value.length==0){
        showAlert("ALERT: Please enter email","red");
    }
    else if(number.value.length==0){
        showAlert("ALERT: Please enter OTP","red");
    }
    else if(number.value.length!=4){
        showAlert("ALERT: Please enter valid OTP","red");
    }
    else if(number.value != otp){
        showAlert("ALERT: Please enter correct OTP  !","red");
    }
    else if(password.value.length==0){
        showAlert("ALERT: Please enter new password","red");
    }
    else if(confirm.value.length==0){
        showAlert("ALERT: Please enter confirm password","red");
    }
    else if(confirm.value!=password.value){
        showAlert("ALERT: Password not match","red");
    }
    else{
        loadChanges(email.value,password.value);
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

function loadChanges(email,password){
    let allData=JSON.parse(localStorage.getItem("user-details"));
    let user = allData.find(user => user.email === email);

    if (user) {
        user.pass = password;
        localStorage.setItem("user-details", JSON.stringify(allData));
        showAlert("Password updated successfully!", "green");
        setTimeout(()=>{
            window.location = "./login.html";
        },1000);
    } else {
        showAlert("User not found!", "red");
    }
}

//Burgur
let burgur=document.querySelector(".burgur");
let x=document.querySelector(".x");
let navDrop=document.querySelector(".nav-dropdown");

burgur.addEventListener("click",handleBurgur);
x.addEventListener("click",handleX);

function handleBurgur(){
    x.style.display="block";
    navDrop.style.display="block";
    burgur.style.display="none";
}

function handleX(){
    x.style.display="none";
    navDrop.style.display="none";
    burgur.style.display="block";
}