const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
let userAmount = document.getElementById('user-amount');
let getUserBtn = document.getElementById('get-users');
let employeeList = document.getElementById('emp-wrapper');
let employees = [];
let apiUrl = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;


fetch(apiUrl)
    .then(response => response.json())
    .then(response => response.results)
    // .then(data => console.log(data))
    .then(generateEmployees)
    .catch(err => console.log(err))



function generateEmployees(employeeData) {

    employees = employeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            </div>
            </div>
        `

        employeeList.innerHTML = employeeHTML;
    });
}

function searchUsers() {
    let input = document.getElementById('search-bar').value
    input = input.toLowerCase();
    let users = document.getElementsByClassName('card');

    for (let i = 0; i < users.length; i++) {
        if (!users[i].innerHTML.toLowerCase().includes(input)) {
            users[i].style.display = "none";
        }
        else {
            users[i].style.display = "";
        }
    }
}

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name: { first, last }, dob, phone, email, location: { city, street: { number, name }, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);


    let modalHTML = `
        <button id="left-btn">&Lang;</button>
        <button id="right-btn">&Rang;</button>
        <img class="avatar" id="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name" id="name">${first} ${last}</h2>
        <p class="email" id="email">${email}</p>
        <p class="address" id="city">${city}</p>
        <hr />
        <p id="phone">${phone}</p>
        <p class="address" id="address">${number} ${name}, ${state} ${postcode}</p>
        <p id="birthday">Birthday:
        ${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

    let rightBtn = document.getElementById('right-btn');
    let leftBtn = document.getElementById('left-btn');

    rightBtn.addEventListener('click', (e) => {

        if (index >= employees.length - 1) {

            index = '-1';

        }

        index = parseInt(index);
        index++;
        index = index.toString();

        let { name: { first, last }, dob, phone, email, location: { city, street: { number, name }, state, postcode
        }, picture } = employees[index];

        let date = new Date(dob.date);

        document.getElementById('avatar').src = `${picture.large}`;
        document.getElementById('name').innerHTML = `${first} ${last}`;
        document.getElementById('email').innerHTML = `${email}`;
        document.getElementById('city').innerHTML = `${city}`;
        document.getElementById('phone').innerHTML = `${phone}`;
        document.getElementById('address').innerHTML = `${number} ${name}, ${state} ${postcode}`;
        document.getElementById('birthday').innerHTML = `Birthday: ${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;


    });


    leftBtn.addEventListener('click', (e) => {

        if (index <= 0) {

            index = '12';

        }

        index = parseInt(index);
        index--;
        index = index.toString();

        let { name: { first, last }, dob, phone, email, location: { city, street: { number, name }, state, postcode
        }, picture } = employees[index];

        let date = new Date(dob.date);

        document.getElementById('avatar').src = `${picture.large}`;
        document.getElementById('name').innerHTML = `${first} ${last}`;
        document.getElementById('email').innerHTML = `${email}`;
        document.getElementById('city').innerHTML = `${city}`;
        document.getElementById('phone').innerHTML = `${phone}`;
        document.getElementById('address').innerHTML = `${number} ${name}, ${state} ${postcode}`;
        document.getElementById('birthday').innerHTML = `Birthday: ${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;


    });

}

employeeList.addEventListener('click', e => {

    if (e.target !== employeeList) {

        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});





