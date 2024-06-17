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