//1
async function getToDos() {
  let response = await fetch("https://jsonplaceholder.typicode.com/todos");
  let json = response.json();
  return json;
}

const todoList = document.querySelector("todo-list");

async function renderQ1() {
  let todo = await getToDos();

  todo.forEach((todo) => {
    let li = document.createElement("li");
    let questionOne = document.querySelector("#todo-list");
    questionOne.append(li);

    li.innerText = todo.title;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.append(checkbox);

    // if (todo.completed === true) {
    //   checkbox.checked = true;
    // }
    checkbox.checked = todo.completed;
  });
}

const createList = document.querySelector("#create-list");
createList.addEventListener("click", renderQ1);

//2

async function getUsers() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let json = await response.json();
  return json;
}

async function renderQ2(userID = null) {
  let users = await getUsers();
  const questionTwo = document.querySelector(".profile-container");
  questionTwo.innerHTML = "";

  // if an ID is provided, filter to that user
  if (userID) {
    users = users.filter((user) => user.id === Number(userID));
  }

  users.forEach((user) => {
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");
    const name = document.createElement("p");
    const email = document.createElement("p");
    const address = document.createElement("p");
    const mobileNumber = document.createElement("p");
    const company = document.createElement("p");

    name.innerText = `Name:${user.name}`;
    email.innerText = `Email: ${user.email}`;
    address.innerText = `Street: ${user.address.street}, City: ${user.address.city}`;
    mobileNumber.innerText = ` Phone:${user.phone}`;
    company.innerText = ` Company: ${user.company.name}`;
    profileCard.append(name, email, mobileNumber, address, company);
    questionTwo.append(profileCard);
  });
}

const getProfile = document.querySelector("#get-profiles");
getProfile.addEventListener("click", () => {
  renderQ2();
});

const filter = document.querySelector("#user-filter");
const filterBtn = document.querySelector("#filter-user");

filterBtn.addEventListener("click", () => {
  const chosenID = filter.value;
  renderQ2(chosenID);
});

//3

async function renderQ3() {
  let users = await getUsers();

  users.forEach((user) => {
    const li = document.createElement("li");
    const userList = document.querySelector("#get-name");
    li.innerText = user.name;
    const showInfoBtn = document.createElement("button");
    showInfoBtn.innerText = "Show Info";
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    li.append(showInfoBtn, deleteBtn);
    userList.append(li);
  });
}

renderQ3();
