import "./style.css";

// Define the state of our app
const todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
];
let nextTodoId = 4;
let filter = "all"; // can be 'all', 'active', or 'completed'

const todoNav = document.getElementById("todo-nav");
const newTodoInput = document.getElementById("new-todo");
const todoListElement = document.getElementById("todo-list");

// Function to render the todos
// Function to render the todos
function renderTodos() {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = ""; // clear the current list

  // Filter todos based on the current filter setting
  // disadvantage of funcitonal programming: take a lot of memory space due to copying
  // advantage: easy to debug, since the object is immutable, you can always check the old one
  let filteredTodos = [];
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (filter === "all") {
      filteredTodos.push(todo);
    } else if (filter === "completed" && todo.completed) {
      filteredTodos.push(todo);
    } else if (filter === "active" && !todo.completed) {
      filteredTodos.push(todo);
    }
  }

  // Helper function to create todo text element
  const createTodoText = (todo) => {
    const todoText = document.createElement("div");
    todoText.id = `todo-text-${todo.id}`;
    todoText.classList.add(
      "todo-text",
      ...(todo.completed ? ["line-through"] : []),
    );
    todoText.innerText = todo.text;
    return todoText;
  };

  // Helper function to create todo edit input element
  const createTodoEditInput = (todo) => {
    const todoEdit = document.createElement("input");
    todoEdit.classList.add("hidden", "todo-edit");
    todoEdit.value = todo.text;
    return todoEdit;
  };

  // Helper function to create a todo item
  const createTodoItem = (todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");
    todoItem.append(createTodoText(todo), createTodoEditInput(todo));
    return todoItem;
  };

  const todoElements = filteredTodos.map(createTodoItem);
  todoListElement.append(...todoElements);

  if (todo.completed) {
    todoText.classList.add("line-through");
  }
}

// Function to toggle the completed status of a todo
function handleClickOnTodoList(event) {
  /*
  if (event.target.id.includes("todo-text")) {
    const todoId = event.target.id.split("-").pop();
    const todoIdNumber = Number(todoId);

    /*for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todoIdNumber) {
        todos[i].completed = !todos[i].completed;
      }
    }
  }*/
  // Helper function to find the target todo element
  const findTargetTodoElement = (event) =>
    event.target.id?.includes("todo-text") ? event.target : null;

  // Helper function to parse the todo id from the todo element
  const parseTodoId = (todo) => (todo ? Number(todo.id.split("-").pop()) : -1);

  // Event handler to toggle the completed status of a todo item
  const handleClickOnTodoList = (event) => {
    todos = toggleTodo(todos, parseTodoId(findTargetTodoElement(event)));
    renderTodos();
  };
}

// Function to handle filter selection from the navbar
function handleClickOnNavbar(event) {
  // if the clicked element is an anchor tag
  if (event.target.tagName === "A") {
    const hrefValue = event.target.href;
    const action = hrefValue.split("/").pop();
    filter = action === "" ? "all" : action;
    renderTodos();
    renderTodoNavBar(hrefValue);
  }
}

// Function to update the navbar anchor elements
function renderTodoNavBar(href) {
  const elements = todoNav.children;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.href === href) {
      element.classList.add(
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
      );
    } else {
      element.classList.remove(
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
      );
    }
  }
}

function handleNewTodoKeyDown(event) {
  if (event.key === "Enter") {
    const newTodoInput = event.target;
    const todoText = newTodoInput.value.trim();
    if (todoText === "") {
      newTodoInput.value = "";
      return;
    }
    todos.push({ id: nextTodoId++, text: todoText, completed: false });
    newTodoInput.value = ""; // clear the input
  }
  renderTodos();
}

newTodoInput.addEventListener("keydown", handleNewTodoKeyDown);
todoNav.addEventListener("click", handleClickOnNavbar);
// Event listener to initialize the app after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", renderTodos);
todoListElement.addEventListener("click", handleClickOnTodoList);
