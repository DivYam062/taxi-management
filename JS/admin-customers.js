let booking = JSON.parse(localStorage.getItem("history")) || [];

function displayCustomers(data) {
    let customerCard = document.querySelector(".customers-cards");
    customerCard.innerHTML = "";

    if (data.length !== 0) {
        data.forEach((cus, index) => {
            let div = document.createElement("div");
            div.className = "customer-card";

            div.innerHTML = `
                <div class="number">
                    <h1>${index + 1}</h1>
                </div>
                <div class="user">
                    <div id="click" class="img pointer">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="text">
                        <h3>${cus.uname}</h3>
                        <p>${cus.number}</p>
                        <p>${cus.address}</p>
                    </div>
                </div>
                <div class="location">
                    <div class="img pointer">
                        <img src="${cus.locImage}" alt="">
                    </div>
                    <div class="text">
                        <h3>${cus.locName}</h3>
                        <p><span>Distance: </span>${cus.locDis}Km</p>
                    </div>
                </div>
                <div class="taxi">
                    <div class="img pointer">
                        <img src="${cus.carImage}" alt="">
                    </div>
                    <div class="text">
                        <h3>${cus.carName}</h3>
                        <p>₹${cus.carPrice}/km</p>
                    </div>
                </div>
            `;

            div.querySelector("#click").addEventListener("click",()=>handleClick(cus));

            let back = div.querySelector(".user .img i");
            if (cus.status === "pending") {
                back.style.background = "yellow";
            } else if (cus.status === "cancel") {
                back.style.background = "red";
            } else if (cus.status=="completed") {
                back.style.background = "cyan";
            } else {
                back.style.background = "green";
            }

            customerCard.appendChild(div);
        });
    } else {
        customerCard.innerHTML = "<p>No customer data available.</p>";
    }
}

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const filteredData = booking.filter(cus => {
    let arr=cus.bookingDate.split('-');
    return tomorrow.getDate() == arr[0] &&
           tomorrow.getMonth()+1 == arr[1] &&
           tomorrow.getFullYear() == arr[2];
});

displayCustomers(booking);

//Search bar
document.getElementById('search').addEventListener('input', () => {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = booking.filter(book => book.uname.toLowerCase().includes(query) || book.locName.toLowerCase().includes(query) || book.carName.toLowerCase().includes(query));
    displayCustomers(filtered);
});

//Filter
let filter = document.querySelector("#filter");
filter.addEventListener("change", sortData);

let filter1 = document.querySelector("#filter1");
filter1.addEventListener("change", sortData);

function sortData() {
    let arr;
    if(filter1.value=="next"){
        arr = [...filteredData];
    }else{
        arr=[...booking];
    }

    if (filter.value === "pending") {
        arr = arr.filter(book => book.status === "pending");
    } else if (filter.value === "cancel") {
        arr = arr.filter(book => book.status === "cancel");
    } else if (filter.value === "complete") {
        arr = arr.filter(book => book.status === "completed");
    } else if (filter.value === "assigned") {
        arr = arr.filter(book => book.status === "assigned");
    }
    displayCustomers(arr);
}


function handleClick(cus){
    localStorage.removeItem("single-customer");
    localStorage.setItem("single-customer",JSON.stringify(cus));
    window.location="./admin-single-customer.html"
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