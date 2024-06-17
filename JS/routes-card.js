let locations=[
    {
        name:"Badrinath",
        desc:"Journey from Dehradun to Badrinath: from Himalayan tranquility to the vibrant energy of India's capital.",
        time:"7",
        distance:"251",
        image:"../Images/top-section-2-img-3.avif",
        map:"https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d880962.988700955!2d78.14409372398993!3d30.400316826051135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x390929c356c888af%3A0x4c3562c032518799!2sDehradun!3m2!1d30.316494499999997!2d78.03219179999999!4m5!1s0x39a78e9f973108e7%3A0xf05a8b5e0c71473!2sBadrinath!3m2!1d30.743308499999998!2d79.49376339999999!5e0!3m2!1sen!2sin!4v1718016440491!5m2!1sen!2sin",
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


function displayData(data){
    let parentDiv=document.getElementById("parent-routes");
    parentDiv.innerHTML="";

    data.forEach(location=>{

        const locationDiv = document.createElement('div');
        locationDiv.className='child-routes';

        locationDiv.innerHTML = `
            <div class="image-click pointer">
                <img class="pointer" src="${location.image}" alt="">
            </div>
            <div>
                <h1>Dehradun To ${location.name}</h1>
                <p>${location.desc}</p>
                <span>Estimated Time: ${location.time}hrs</span>
                <span>Distance: ${location.distance}Km</span>
            </div>
        `;
        locationDiv.querySelector(".image-click").addEventListener("click",()=>handleBtn(location));

        parentDiv.appendChild(locationDiv);
    });
}
displayData(locations);

//search bar
document.getElementById('search-input1').addEventListener('input', () => {
    const query = document.getElementById('search-input1').value.toLowerCase();
    const filteredLocations = locations.filter(location => location.name.toLowerCase().includes(query));
    displayData(filteredLocations);
});

displayData(locations);


//Sort and filter
let dis=document.getElementById("distance");
dis.addEventListener("change",sortData);

let time=document.getElementById("time");
time.addEventListener("change",sortData);

let filter= document.getElementById("filter");
filter.addEventListener("change",sortData);

function sortData() {
    let arr=[...locations];

    if(filter.value == "100"){
        arr = arr.filter(location => location.distance >= 0 && location.distance < 100);
    }
    else if(filter.value == "200"){
        arr = arr.filter(location => location.distance >= 100 && location.distance < 200);
    }
    else if(filter.value == "300"){
        arr = arr.filter(location => location.distance >= 200 && location.distance < 300);
    }
    else if(filter.value == "above"){
        arr = arr.filter(location => location.distance >= 300);
    }
    else{
        displayData(locations);
    }
    
    if(dis.value == "l2h"){
        arr.sort((a,b)=>a.distance-b.distance);
    }
    else if(dis.value == "h2l"){
        arr.sort((a, b) => b.distance - a.distance);
    }
    else if(time.value == "" && filter.value ==""){
        displayData(locations);
    }

    if(time.value == "l2h"){
        arr.sort((a,b)=>a.time-b.time);
    }
    else if(time.value == "h2l"){
        arr.sort((a,b)=>b.time-a.time);
    }
    else if(dis.value == "" && filter.value == ""){
        displayData(locations);
    }

    displayData(arr);
}

function handleBtn(location){
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