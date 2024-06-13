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

let cars=[
    {
        name:"Maruti Suzuki Celerio",
        category:"Business",
        desc:"The Maruti Suzuki Celerio is a compact hatchback known for its fuel efficiency and practical design, making it an ideal choice for urban commuting. It features a spacious interior, user-friendly technology, and the option of an AMT gearbox for added convenience.",
        price:"10",
        capacity:"5-seater",
        airbags:"Dual front airbags",
        features:"Suzuki Connect, ABS with EBD, Heartect platform",
        image:"../Images/celerio.webp",
    },
    {
        name:"Honda Amaze",
        category:"Standard",
        desc:"The Honda Amaze is a compact sedan known for its stylish design, spacious interior, and excellent fuel efficiency. It offers a comfortable ride with advanced safety features and modern infotainment options, making it a practical choice for urban and highway driving.",
        price:"20",
        capacity:"5-seater",
        airbags:"Dual front airbags (standard)",
        features:"Multi-angle rearview camera, Honda LaneWatch, ABS with EBD",
        image:"../Images/amaze.webp",
    },
    {
        name:"Maruti Suzuki Dzire",
        category:"Standard",
        desc:"The Maruti Suzuki Dzire is a compact sedan celebrated for its sleek design, fuel efficiency, and comfortable cabin. It offers a smooth ride, modern features, and advanced safety technologies, making it a top choice for urban commuters and small families alike.",
        price:"25",
        capacity:"5-seater",
        airbags:"Dual front airbags (standard)",
        features:"SmartPlay infotainment system, Android Auto and Apple CarPlay support, ABS with EBD, ISOFIX child seat mounts",
        image:"../Images/dzire.webp",
    },
    {
        name:"Tata Tiago",
        category:"Business",
        desc:"The Tata Tiago is a stylish and compact hatchback that offers a blend of performance, fuel efficiency, and modern features. It comes with a well-designed interior, advanced safety options, and a user-friendly infotainment system, making it a popular choice for urban commuters.",
        price:"18",
        capacity:"5-seater",
        airbags:"Dual front airbags (standard)",
        features:"Harman infotainment system, ABS with EBD, Dual airbags",
        image:"../Images/tiago.webp",
    },
    {
        name:"Maruti Suzuki Wagon R",
        category:"Business",
        desc:"The Maruti Suzuki Wagon R is a popular tallboy hatchback offering a spacious and practical interior, making it a favorite among small families. Known for its reliability and fuel efficiency, it comes with a choice of peppy engines and advanced safety features.",
        price:"15",
        capacity:"5-seater",
        airbags:"Dual front airbags",
        features:"Suzuki Connect, ABS with EBD, Heartect platform",
        image:"../Images/wagonR.webp",
    },
]

let details = JSON.parse(localStorage.getItem("single"));

if(details){
    let parentDiv=document.querySelector(".top-section-1");
    parentDiv.innerHTML=`
    <div class="img">
        <img src="${details.image}" alt="">
    </div>
    <div class="text">
        <h1>${details.name}</h1>
        <p>${details.desc}</p>
        <ul>
            <li><span>Price: </span>₹${details.price}/km</li>
            <li><span>Seating Capacity:</span> ${details.capacity}</li>
            <li><span>Airbags:</span> ${details.airbags}</li>
            <li><span>Safety Features:</span> ${details.features}</li>
        </ul>
        <div class="btn">
            <button class="book-now pointer">BOOK NOW</button>
            <button onclick="window.location.href='./cars-card.html#mid-section-1'" class="pointer">BACK TO CARS</button>
        </div>
    </div>
    `;
    parentDiv.querySelector(".book-now").addEventListener("click", () => handleBook(details));
}

function displayCars() {
    const container = document.querySelector('.child');
    container.innerHTML = '';

    cars.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.className='child-cars';

        carDiv.innerHTML = `
            <div class="single pointer">
                <img src="${car.image}" alt="">
            </div>
            <div>
                <h1>${car.name}</h1>
                <p><span>Category: </span>${car.category}</p>
                <h2>₹${car.price}/km</h2>
                <button class="book-now pointer">BOOK NOW</button>
            </div>
        `;
        carDiv.querySelector(".single").addEventListener("click", () => handleSingle(car));
        carDiv.querySelector(".book-now").addEventListener("click", () => handleBook(car));

        container.appendChild(carDiv);
    });
}

displayCars();

const scrollContainer = document.querySelector('.child');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const scrollAmount = 350;

leftArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({
        top: 0,
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

rightArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
    });
});

//single page
function handleSingle(car){
    localStorage.removeItem("single");
    localStorage.setItem("single",JSON.stringify(car));
    window.location.href='./single-card.html';
}

//car select
function handleBook(car){
    let userLog=JSON.parse(localStorage.getItem("userLog"));
    if(userLog){
        localStorage.removeItem("car");
        localStorage.setItem("car",JSON.stringify(car));
        window.location.href='./checkout.html';
    }else{
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
        location.location = "../index.html";
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