(function() {
  const form = document.querySelector("#main-form");
  const input = document.querySelector("#todoInput");
  const todoList = document.querySelector("#todoList");
  const searchListitem = document.querySelector("#searchListitem");

  form.addEventListener("submit", addTodoItem);
  searchListitem.addEventListener("keyup", searchList);
  searchListitem.addEventListener("blur", function() {
    this.value = "";
    Array.from(todoList.children).forEach(el => (el.style.display = "flex"));
  });

  // Create new elements

  function createElement(tag, props, ...children) {
    const element = document.createElement(tag);
    Object.keys(props).forEach(key => (element[key] = props[key]));
    if (children.length > 0) {
      children.forEach(child => {
        if (typeof child === "string") {
          child = document.createTextNode(child);
        }
        element.appendChild(child);
      });
    }
    return element;
  }

  // Create new list item

  function createTodoItem(title) {
    const checkbox = createElement(
      "i",
      { className: "material-icons" },
      "check_box_outline_blank"
    );
    const checkboxDiv = createElement(
      "div",
      { className: "checkbox" },
      checkbox
    );

    const label = createElement("label", {}, title);
    const editInput = createElement("input", {
      type: "text",
      className: "textfield"
    });
    const editIcon = createElement(
      "i",
      { className: "material-icons material-edit" },
      "edit"
    );
    const deleteIcon = createElement(
      "i",
      { className: "material-icons material-delete" },
      "delete"
    );
    const editBtn = createElement(
      "button",
      { className: "editBtn button" },
      editIcon
    );
    const deleteBtn = createElement(
      "button",
      { className: "deleteBtn button" },
      deleteIcon
    );
    const buttonsDiv = createElement(
      "div",
      { className: "buttons" },
      editBtn,
      deleteBtn
    );

    const listItem = createElement(
      "li",
      {
        className:
          "list-group-item justify-content-between align-items-center my-1"
      },
      checkboxDiv,
      label,
      editInput,
      buttonsDiv
    );
    bindEvents(listItem);
    return listItem;
  }

  // Add item to the list
  function addTodoItem(e) {
    e.preventDefault();
    if (input.value === "") return alert("please add task name...");
    const listItem = createTodoItem(input.value);
    todoList.insertAdjacentElement("afterBegin", listItem);
    form.reset();
  }

  // Bind events to buttons and checkbox

  function bindEvents(todo) {
    const checkboxDiv = todo.querySelector("div.checkbox");
    const deleteBtn = todo.querySelector(".deleteBtn");
    const editBtn = todo.querySelector(".editBtn");

    checkboxDiv.addEventListener("click", toggleTodoItem);
    deleteBtn.addEventListener("click", deleteTodoItem);
    editBtn.addEventListener("click", editTodoItem);
  }
  function toggleTodoItem() {
    const listItem = this.parentNode;

    const completedList = document.querySelector("#completed");
    listItem.classList.toggle("completed")
      ? completedList.insertAdjacentElement("afterBegin", listItem)
      : todoList.insertAdjacentElement("beforeEnd", listItem);
    listItem.classList.contains("completed")
      ? (listItem.querySelector("i.material-icons").innerText = "check_box")
      : (listItem.querySelector("i.material-icons").innerText =
          "check_box_outline_blank");
  }
  function deleteTodoItem() {
    const listItem = this.parentNode.parentNode;
    listItem.parentNode.removeChild(listItem);
  }
  function editTodoItem() {
    const listItem = this.parentNode.parentNode;
    const label = listItem.querySelector("label");
    const editInput = listItem.querySelector(".textfield");
    const editMode = listItem.classList.contains("editMode");

    if (editMode) {
      label.innerText = editInput.value;
      this.innerHTML = '<i class="material-icons material-edit">edit</i>';
    } else {
      editInput.value = label.innerText;
      this.innerHTML = '<i class="material-icons material-save">save</i>';
    }
    listItem.classList.toggle("editMode");
  }

  function searchList() {
    const allListItems = todoList.children;

    Array.from(allListItems).forEach(el => {
      const labels = el.querySelector("label").innerText.toLowerCase();
      const inputValue = this.value.toLowerCase();
      if (labels.indexOf(inputValue) !== -1) {
        //   el.style.display = "";
        el.style.display = "flex";
      } else {
        el.style.display = "none";
      }
    });
  }
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDxEUCqzLZJjIDUw-E_cF9mqusb9d_cDPw",
    authDomain: "todolist-6d9ba.firebaseapp.com",
    databaseURL: "https://todolist-6d9ba.firebaseio.com",
    projectId: "todolist-6d9ba",
    storageBucket: "todolist-6d9ba.appspot.com",
    messagingSenderId: "320355228892"
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      $("#signOut").on("click", e => {
        firebase
          .auth()
          .signOut()
          .then(e => {
            window.location.href = "../public/register/login.html";
          });
      });
    }
  });
})();
