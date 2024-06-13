let drivers = JSON.parse(localStorage.getItem("driver-details")) || [];
let customer = JSON.parse(localStorage.getItem("history")) || [];

function displayDrivers(data){
    if(data.length != 0){
        let body = document.querySelector(".tbody");
        body.innerHTML = "";

        let div = document.querySelector(".show");
        div.style.display = "none";
        
        data.forEach(driver => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${driver.driverName}</td>
                <td>${driver.email}</td>
                <td>${driver.number}</td>
                <td class="status">
                    <button class="pointer"></button>
                </td>
                <td class="action">
                    <i class="view fa-solid fa-eye pointer"></i>
                    <i class="updater fa-solid fa-pen-nib pointer"></i>
                    <i class="deleter fa-solid fa-trash pointer"></i>
                </td>
            `;

            tr.querySelector(".view").addEventListener("click", () => handleSingle(driver));
            tr.querySelector(".updater").addEventListener("click", () => handleUpdate(driver));
            tr.querySelector(".deleter").addEventListener("click", () => handleDelete(driver));

            body.appendChild(tr); 
            
            let btn = tr.querySelector(".status>button");
    
            if(driver.carAssigned != "none"){
                btn.innerText = "ASSIGNED";
                btn.className = "btn-active";
            } else {
                btn.innerText = "NOT ASSIGNED";
                btn.className = "btn-notActive";
            }
    
            btn.addEventListener("click", () => {
                if(driver.carAssigned != "none"){
                    driver.carAssigned = "none";
                    btn.innerText = "NOT ASSIGNED";
                    btn.className = "btn-notActive";

                    customer.forEach(cust => {
                        if(cust.driverNumber === driver.number) {
                            cust.status = "completed";
                        }
                    });
                    localStorage.setItem("history", JSON.stringify(customer));
                }
                localStorage.setItem("driver-details", JSON.stringify(drivers));
            });
        });
    } else {
        let body = document.querySelector(".tbody");
        body.innerHTML = "";
        let div = document.querySelector(".show");
        div.style.display = "block";
    }
}

displayDrivers(drivers);

document.getElementById('search-input1').addEventListener('input', () => {
    const query = document.getElementById('search-input1').value.toLowerCase();
    const filteredDrivers = drivers.filter(driver => driver.driverName.toLowerCase().includes(query));
    displayDrivers(filteredDrivers);
});

function handleSingle(driver){
    localStorage.removeItem("single-driver");
    localStorage.setItem("single-driver", JSON.stringify(driver));
    window.location.href = './admin-single-driver.html';
}

function handleUpdate(driver){
    localStorage.removeItem("single-driver");
    localStorage.setItem("single-driver", JSON.stringify(driver));
    window.location.href = './admin-update-driver.html';
}

function handleDelete(driver){
    if(confirm(`Are you sure you want to delete driver ${driver.driverName}?`)) {
        drivers = drivers.filter(d => d.number !== driver.number && d.email !== driver.email);
        localStorage.setItem("driver-details", JSON.stringify(drivers));
        displayDrivers(drivers);
    }
}

// Admin Log
let adminLog = JSON.parse(localStorage.getItem("adminLog"));

if(adminLog && adminLog.length != 0){
    let nameEle = document.getElementById("name");
    let na = document.getElementById("na");
    let a = adminLog.name.toUpperCase().split(" ");
    nameEle.textContent = a[0];
    nameEle.removeAttribute("href");
    na.style.backgroundColor = "rgb(255, 191, 0)";
    na.style.border = "none";

    let logEle = document.getElementById("log");
    logEle.removeAttribute("href");
    logEle.textContent = "Logout";

    logEle.addEventListener("click", function() {
        localStorage.removeItem("adminLog");
        na.style.backgroundColor = "white";
        na.style.border = "2px solid black";
        window.location.href = "./admin-login.html";
    });
}else{
    let nameEle = document.getElementById("name");
    nameEle.addEventListener("click",window.location.href="./admin-signup.html");
}
