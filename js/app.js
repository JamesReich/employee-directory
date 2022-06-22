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

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name: { first, last }, dob, phone, email, location: { city, street: { number, name }, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${first} ${last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${number} ${name}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
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