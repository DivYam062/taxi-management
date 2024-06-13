let number=document.getElementById("number");
let email=document.getElementById("email");
let pass=document.getElementById("pass");
let checkbox=document.getElementById("checkbox");
let loginBtn=document.getElementById("login-btn");

loginBtn.addEventListener("click",loginUser);

function loginUser(e){
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
    else if(pass.value.length<6){
        showAlert("ALERT: Enter correct password","red");
    }
    else if(checkbox.checked==false){
        showAlert("ALERT: Please accept term and condition","red");
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

async function loadData(number,email,pass){
    let allData=JSON.parse(localStorage.getItem("user-details"));
    if(allData && allData.length!=0){
        let userFound = false;
        let username='';
        let useremail='';

        for(let i=0;i<allData.length;i++){
            let user=allData[i];
            if(number == user.number && email == user.email && pass == user.pass){
                username = user.username;
                useremail = user.email;
                userFound = true;
                break;
            }
        }

        if(userFound==true){
            let obj1={
                name:username,
                email:useremail,
            }
            localStorage.setItem("userLog", JSON.stringify(obj1));
            showAlert("Login Successful", "green");
            number.value = "";
            email.value = "";
            pass.value = "";
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1000);
        }else{
            showAlert("ALERT: No User Found!", "red");
        }
    }else{
        showAlert("ALERT: No User Data Available!", "red");
    }
}