//1
async function getToDos() {
  let response = await fetch("https://jsonplaceholder.typicode.com/todos");
  let json = response.json();
  return json;
}

async function renderQ1() {
  let todo = await getToDos();

  let latestID = 0;
  let questionOne;

  todo.forEach((todo) => {
    if (todo.userId !== latestID) {
      latestID = todo.userId;
      let h3 = document.createElement("h3");
      h3.innerText = `To do List for User ${todo.userId}`;
      questionOne = document.createElement("ul");
      questionOne.style.border = "1px solid black";
      document.querySelector("#Q1").append(h3, questionOne);
    }

    let li = document.createElement("li");
    li.innerText = todo.title;
    questionOne.append(li);

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

  //Dom elements, add outside of foreach so you crate the container and append it once and then just reuse it
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.style.display = "none";
  const q3Container = document.querySelector(".Q3-container");
  q3Container.append(userInfo);

  users.forEach((user) => {
    async function getUserPosts() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/user/${user.id}/posts`,
      );
      const json = response.json();
      return json;
    }

    async function getUsersTodos() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/user/${user.id}/todos`,
      );
      const json = response.json();
      return json;
    }

    const li = document.createElement("li");
    const userList = document.querySelector("#get-name");
    li.innerText = user.name;

    const showInfoBtn = document.createElement("button");
    showInfoBtn.classList.add("show-info");
    showInfoBtn.innerText = "Show Info";
    showInfoBtn.addEventListener("click", async () => {
      userInfo.innerHTML = "";

      //to get the data for posts + todos
      let userPosts = await getUserPosts();
      let userTodos = await getUsersTodos();

      const name = document.createElement("p");
      name.innerText = `Name: ${user.name}`;

      const city = document.createElement("p");
      city.innerText = `City: ${user.address.city}`;

      const postTitle = document.createElement("p");
      postTitle.innerText = "User Posts:";
      const postsList = document.createElement("ul");
      userPosts.forEach((post) => {
        const userPost = document.createElement("li");
        userPost.innerText = post.title;
        postsList.append(userPost);
      });

      const unfinishedTodos = document.createElement("p");
      unfinishedTodos.innerText = "Unfinished Todos:";
      const todoList = document.createElement("ul");
      userTodos.forEach((todo) => {
        const todos = document.createElement("li");
        if (!todo.completed) {
          todos.innerText = todo.title;
          todoList.append(todos);
        }
      });

      userInfo.append(
        name,
        city,
        postTitle,
        postsList,
        unfinishedTodos,
        todoList,
      );

      userInfo.style.display = "block";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this user from the list?")) {
        deleteBtn.closest("li").remove();
      }
    });

    console.log(user);
    li.append(showInfoBtn, deleteBtn);
    userList.append(li);
  });
}

renderQ3();
