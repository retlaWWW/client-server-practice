document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:4000/edit";
    const root = document.getElementById("root");
    const users = [
      { id: 1, name: "Daddy" },
      { id: 2, name: "Accord" },
    ];
  
    if (!root) {
      console.error("Root element not found");
      return;
    }
  
    const inputHTML = (name) =>
      `<input placeholder="Write the name here" value="${name}">`;
  
    const buttonHTML = (text, method) =>
      `<button type="submit" data-method="${method}">${text}</button>`;
  
    const formHTML = (user) => `
        <form id="form" data-id="${user.id}">
          ${inputHTML(user.name)}
          ${buttonHTML("Save", "")}
        </form>
      `;
  
    const fetchData = async (url, id) => {
      try {
        const response = await fetch(id !== undefined ? `${url}/${id}` : url);
  
        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return null;
        }
  
        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);
  
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Response is not JSON");
          return null;
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formElement = document.querySelector("#form");
      if (!formElement) {
        console.error("Form element not found");
        return;
      }
  
      const userId = formElement.dataset.id;
      const inputElement = formElement.querySelector("input");
      const newName = inputElement.value;

      const userToUpdate = users.find((user) => user.id === parseInt(userId));
      if (userToUpdate) {
        userToUpdate.name = newName;
        console.log("Local users array updated:", users);
      }

      console.log(`User ${userId} updated with name: ${newName}`);
    };
  
    const handleClick = async ({ target }) => {
      const userTarget = target.classList.contains("user")
        ? target
        : target.closest(".user");
  
      if (userTarget) {
        const userId = userTarget.querySelector(".user-id").textContent;
        const userData = await fetchData(url, userId);
  
        const formElement = document.querySelector("#form");
  
        if (!formElement) {
          root.insertAdjacentHTML("beforeend", formHTML(userData));
        } else {
          formElement.innerHTML = formHTML(userData);
          const inputElement = formElement.querySelector("input");
          inputElement.value = userData.name;
  
          formElement.addEventListener("submit", handleSubmit);
        }
      }
    };
  
    window.addEventListener("click", handleClick);
  
    const usersHTML = (users) =>
      users
        .map(
          (user) => `
              <div class="user" data-user-id="${user.id}">
                <span class="user-id">${user.id}</span>
                <span class="user-name">${user.name}</span>
              </div>
            `
        )
        .join("");
  
    root.insertAdjacentHTML("beforeend", usersHTML(users));
  });
  