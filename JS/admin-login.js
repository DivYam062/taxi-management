let number=document.getElementById("number");
let email=document.getElementById("email");
let pass=document.getElementById("pass");
let btn=document.getElementById("login-btn");

btn.addEventListener("click",handleLog);

function handleLog(e){
    e.preventDefault();
    if(number.value.length==0){
        showAlert("ALERT: Please enter your number","red");
    }
    else if(number.value.length!=10){
        showAlert("ALERT: Please enter valid number","red");
    }
    else if(email.value.length==0){
        showAlert("ALERT: Please enter email","red");
    }
    else if(!email.value.includes('@'&&'.')){
        showAlert("ALERT: Please enter valid email","red")
    }
    else if(pass.value.length==0){
        showAlert("ALERT: Please enter password","red");
    }
    else{
        loadData(number.value,email.value,pass.value);
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

async function loadData(){
    let adminData=JSON.parse(localStorage.getItem("admin-details")) || [];
    if(adminData && adminData.length!=0){
        let adminFound = false;
        let adminName='';
        let adminEmail='';

        for(let i=0;i<adminData.length;i++){
            let admin=adminData[i];
            if(number.value == admin.number && email.value == admin.email && pass.value == admin.pass){
                adminName = admin.adminName;
                adminEmail = admin.email;
                adminFound = true;
                break;
            }
        }

        if(adminFound==true){
            let obj1={
                name:adminName,
                email:adminEmail,
            }
            console.log(obj1);
            localStorage.setItem("adminLog", JSON.stringify(obj1));
            showAlert("Login Successful", "green");
            number.value = "";
            email.value = "";
            pass.value = "";
            setTimeout(() => {
                window.location.href = "./admin-dashboard.html";
            }, 1000);
        }else{
            showAlert("ALERT: No User Found!", "red");
        }
    }else{
        showAlert("ALERT: No User Data Available!", "red");
    }
}

//Admin log
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
