let locations=[
    {
        name:"Badrinath",
        desc:"Journey from Dehradun to Badrinath: from Himalayan tranquility to the vibrant energy of India's capital.",
        time:"7",
        distance:"251",
        image:"../Images/top-section-2-img-3.avif",
    },
    {
        name:"Kedarnath",
        desc:"Experience the scenic journey from bustling Dehradun to the serene, tranquil hills of Kedarnath.",
        time:"7",
        distance:"324",
        image:"../Images/top-section-2-img-2.jpg",
    },
    {
        name:"Nainital",
        desc:"Travel from Dehradun to Nainital by car, enjoying coastal beauty and scenic Western Ghats along the way.",
        time:"6",
        distance:"493",
        image:"../Images/top-section-2-img-1.cms",
    },
    {
        name:"Gangotri",
        desc:"The journey from Dehradun to Gangotri offers stunning views of the Garhwal Himalayas and sacred landscapes.",
        time:"6",
        distance:"224",
        image:"../Images/top-section-2-img-4.jpg",
    },
    {
        name:"Yamunotri",
        desc:"The journey from Dehradun to Yamunotri offers a picturesque route through the scenic beauty of the Garhwal Himalayas.",
        time:"5",
        distance:"124",
        image:"../Images/top-section-2-img-5.webp",
    },
    {
        name:"Uttarkashi",
        desc:"Uttarkashi is a Hindu religious place for spiritual and adventurous tourism. Uttarkashi town is also called as Shivnagri.",
        time:"4",
        distance:"144",
        image:"../Images/top-section-2-img-6.jpg",
    },
    {
        name:"Rishikesh",
        desc:"Rishikesh is a city in India’s northern state of Uttarakhand, in the Himalayan foothills beside the Ganges River",
        time:"1",
        distance:"38",
        image:"../Images/top-section-2-img-7.avif",
    },
    {
        name:"Mussorie",
        desc:"Mussoorie is a hill station and a municipal board, in Dehradun city in the Dehradun district of the Indian state Uttarakhand",
        time:"2",
        distance:"40",
        image:"../Images/top-section-2-img-8.jpg",
    },
    {
        name:"Chamoli",
        desc:"Chamoli hosts a variety of destinations of pilgrim and tourist interest including Badrinath, Hemkund Sahib and Valley of Flowers.",
        time:"8",
        distance:"264",
        image:"../Images/top-section-2-img-9.webp",
    },
];

let loc=JSON.parse(localStorage.getItem("location"));
let ca=JSON.parse(localStorage.getItem("car"));
let dates=JSON.parse(localStorage.getItem("settingDates"));

let uname = document.getElementById("uname");
let number = document.getElementById("number");
let email = document.getElementById("email");
let address = document.getElementById("address");
let bookDate = document.getElementById("book-date");
let bookDay = document.getElementById("book-day");
let holdername = document.getElementById("holdername");
let cardnum = document.getElementById("cardnum");
let date = document.getElementById("date");
let cvv = document.getElementById("cvv");
let pay = document.getElementById("pay");

let locationDiv=document.querySelector(".location");
locationDiv.innerHTML="";
locationDiv.innerHTML=`
    <div>
        <img class="pointer" src="${loc.image}" alt="">
    </div>
    <div>
        <h3>Dehradun To ${loc.name}</h3>
        <p><span>Distance: </span>${loc.distance}Km</p>
    </div>
`;

let carDiv=document.querySelector(".taxi");
carDiv.innerHTML="";
carDiv.innerHTML=`
    <div class="img">
        <img src="${ca.image}" alt="">
    </div>
    <div class="text">
        <h3>${ca.name}</h3>
        <p><span>Price: </span>₹${ca.price}/km</p>
    </div>
`;

//autofill
let user=JSON.parse(localStorage.getItem("userLog"));
let userDetails=JSON.parse(localStorage.getItem("user-details")) || [];


userDetails.forEach(userDetail=>{
    if(userDetail.username === user.name){
        uname.value = userDetail.username || "";
        number.value = userDetail.number || "";
        email.value = userDetail.email || "";
        holdername.value = userDetail.username || "";
        bookDate.value = dates.date || "";
        bookDay.value = dates.days || "";
    }
});

let currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);


//btn function
pay.addEventListener("click",handlePayment)

function handlePayment(e){
    e.preventDefault();
    if(uname.value.length==0){
        showAlert("ALERT: Please enter your name","red");
    }
    else if(number.value.length==0){
        showAlert("ALERT: Please enter your number","red");
    }
    else if(number.value.length!=10){
        showAlert("ALERT: Please enter valid number","red");
    }
    else if(email.value.length==0){
        showAlert("ALERT: Please enter your email","red");
    }
    else if(!email.value.includes("@"&&".")){
        showAlert("ALERT: Please enter vaild email","red");
    }
    else if(address.value.length==0){
        showAlert("ALERT: Enter your address","red");
    }else if(bookDate.value.length==0){
        showAlert("ALERT: Enter date of booking","red");
    }
    else if(!/^\d{1,2}-\d{1,2}-\d{4}$/.test(bookDate.value)){
        showAlert("ALERT: Enter date properly (DD-MM-YYYY)","red");
    }
    else if(bookDay.value.length==0){
        showAlert("ALERT: Enter number of days for booking","red");
    }
    else if(bookDay.value>5){
        showAlert("ALERT: You can book only uptp 5 days","red");
    }
    else if(holdername.value.length==0){
        showAlert("ALERT: Please enter bank holder name","red");
    }
    else if(cardnum.value.length==0){
        showAlert("ALERT: Please enter account number","red");
    }
    else if(cardnum.value.length!=12){
        showAlert("ALERT: Please enter valid account number","red");
    }
    else if(date.value.length==0){
        showAlert("ALERT: Please enter expire date of card","red");
    }
    else if (!/^\d{2}-\d{4}$/.test(date.value)) {
        showAlert("ALERT: Enter expiry date properly (MM-YYYY)", "red");
    }else{
        let [month, year] = date.value.split('-');
        let expiryDate = new Date(year, month);
        expiryDate.setMonth(expiryDate.getMonth() + 1, 0);
        expiryDate.setHours(23, 59, 59, 999);
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (expiryDate <= currentDate) {
            showAlert("ALERT: Your card is expired", "red");
        } else if (cvv.value.length == 0) {
            showAlert("ALERT: Please enter CVV pin", "red");
        } else if (cvv.value.length != 3) {
            showAlert("ALERT: CCV pin can't be less or more than 3 length", "red");
        } else {
            loadData(uname.value, number.value, email.value, address.value, bookDate.value,bookDay.value);
        }
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

function loadData(uname,number,email,address,bookDate,bookDay)  {
    let historyData = JSON.parse(localStorage.getItem("history")) || [];

    let obj={
        uname:uname,
        number:number,
        email:email,
        address:address,
        bookingDate: bookDate,
        bookingDay:bookDay,
        locImage:loc.image,
        locName:loc.name,
        locDis:loc.distance,
        carImage:ca.image,
        carName:ca.name,
        carPrice:ca.price,
        carDesc:ca.desc,
        carCapacity:ca.capacity,
        carAirbags:ca.airbags,
        carFeatures:ca.features,
        status:"pending",
        driverName:"",
        driverNumber:"",
    }
    historyData.unshift(obj);
    
    localStorage.setItem("history", JSON.stringify(historyData));
    showAlert("Booking sucessful !","green");
    let abs=document.querySelector(".abs");
    abs.style.display="block";
    setTimeout(()=>{
        window.location.href="../index.html";
        abs.style.display="none";
    },4000);
}

//Local storage Update
let historyData = JSON.parse(localStorage.getItem("history")) || [];
let userLog = JSON.parse(localStorage.getItem("userLog")) || [];

if(userLog?.email?.length!=0) {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    let userHistory = historyData.filter(entry => {
        let date=entry.bookingDate.split("-");
        return entry.email === userLog.email && (year<date[2] || month<date[1] || day<=date[0]) && entry.status!="cancel" && entry.status!="completed";
    });
    localStorage.setItem("user-booking", JSON.stringify(userHistory));
}

//Badge update
let userBooking=JSON.parse(localStorage.getItem("user-booking")) || [];
let bookCount=document.getElementById("book-count");
bookCount.innerText="";
bookCount.innerText=userBooking.length;

//UserLog
if(userLog && userLog.length!=0){
    let nameEle = document.getElementById("name");
    nameEle.textContent=userLog.name.toUpperCase();
    nameEle.removeAttribute("href");

    let logEle = document.getElementById("log");
    logEle.removeAttribute("href");
    logEle.textContent = "Logout";

    logEle.addEventListener("click",function(){
        localStorage.removeItem("userLog");
        window.location = "../index.html";
    });
}

//Search bar nav
let searchInput = document.getElementById("search-input");
let searchIcon = document.getElementById("search-icon");
let searchResult = document.getElementById("search-result");

searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    if(query.length==0){
        searchResult.style.display="none";
    }else{
        searchResult.style.display="block";
    }
    const results = filterLocations(query);
    searchInput.style.display="block";
    displayResults(results);
});

searchIcon.addEventListener("click", () => {
    const query = searchInput.value;
    const results = filterLocations(query);
    searchInput.style.display="block";  
    displayResults(results);
});

function filterLocations(query) {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
}

function displayResults(results) {
    searchResult.innerHTML = "";
    if(results.length == 0) {
        searchResult.innerHTML = "<p>No results found</p>";
    }
    results.forEach(location => {
        let div=document.createElement("div");
        div.className="outer";
        div.innerHTML=`
            <div class="inner-img">
                <img src="${location.image}">
            </div>
            <div class="inner-text">
                <p><span>Name:</span> ${location.name}</p>
                <p><span>Distance:</span> ${location.distance}</p>
            </div>
        `;

        div.addEventListener("click",()=>handleSearch(location));

        searchResult.appendChild(div);
    });
}

function handleSearch(location){
    let userLog=JSON.parse(localStorage.getItem("userLog"));
    if(userLog){
        localStorage.removeItem("location");
        localStorage.setItem("location",JSON.stringify(location));
        window.location.href='./cars-card.html';
    }
    else{
        window.location.href='./login.html';
    }
}

//Price update
let pri=document.querySelector(".pri");
pri.innerText="";
pri.innerText=ca.price;

let dis=document.querySelector(".dis");
dis.innerText="";
dis.innerText=loc.distance;

let day=document.querySelector(".day");
day.innerText="";
day.innerText=bookDay.value;

let tot=document.querySelector(".tot");
tot.innerText="";
tot.innerText=ca.price*loc.distance*bookDay.value;

let total=document.querySelector(".total");
total.innerText="";
total.innerText=ca.price*loc.distance*bookDay.value;

//admin log
let adminLog = JSON.parse(localStorage.getItem("adminLog"));

let admin = document.getElementById("admin");
admin.addEventListener("click",handleAdmin);

function handleAdmin(){
    if(adminLog && adminLog.length != 0){
        window.location.href="./admin-dashboard.html"
    }
    else{
        window.location.href="./admin-login.html"
    }   
}