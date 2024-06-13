let username=document.getElementById("name");
let number=document.getElementById("number");
let email=document.getElementById("email");
let pass=document.getElementById("pass");
let signupBtn=document.getElementById("signup-btn");

signupBtn.addEventListener("click",registerData);

function registerData(e){
    e.preventDefault();
    if(username.value.length==0){
        showAlert("ALERT: Please enter your name","red");
    }
    else if(number.value.length==0){
        showAlert("ALERT: Please enter your number","red");
    }
    else if(number.value.length!=10){
        showAlert("ALERT: Please enter valid phone number","red");
    }
    else if(email.value.length==0){ 
        showAlert("ALERT: Please enter your email","red");
    }
    else if(!email.value.includes('@'&&'.')){
        showAlert("ALERT: Please enter valid email","red")
    }
    else if(pass.value.length==0){
        showAlert("ALERT: Please set your password","red");
    }
    else{
        loadData(username.value,number.value,email.value,pass.value);
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

async function loadData(username,number,email,pass){
    let arr=JSON.parse(localStorage.getItem("user-details")) || [];
    let userExists = arr.some(user => user.number === number || user.email === email);

    if(userExists){
        showAlert("ALERT: User with this number or email already exists!", "red");
    }
    else{
        let obj={
            username:username,
            number:number,
            email:email,
            pass:pass,
        };
        arr.push(obj);
        localStorage.setItem("user-details",JSON.stringify(arr));
        showAlert("Registration sucessful !","green");
        setTimeout(()=>{
            window.location.href="./login.html";
        },1000);
        username.value="";
        number.value="";
        email.value="";
        pass.value="";
    }
}

