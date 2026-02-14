import "./style.css";

// Get the necessary DOM elements
const todoListElement = document.getElementById("todo-list");
const inputNewTodo = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");

// Helper function to create a new array with the existing todos and a new todo item
const addTodo = (todos, newTodoText, newTodoId) => [
  ...todos,
  { id: newTodoId, text: newTodoText, completed: false },
];

// Helper function to toggle the completed status of a todo item
const toggleTodo = (todos, todoId) =>
  todos.map((todo) =>
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
  );

// Helper function to filter todos based on the current filter setting
const filterTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return [...todos];
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "active":
      return todos.filter((todo) => !todo.completed);
    default:
      return [...todos];
  }
};

// Factory function to create a todo app
const createTodoApp = () => {
  // Define the state of our app
  let todos = [];
  let nextTodoId = 1;
  let filter = "all"; // can be 'all', 'active', or 'completed'

  return {
    addTodo: (newTodoText) => {
      todos = addTodo(todos, newTodoText, nextTodoId++);
    },
    toggleTodo: (todoId) => {
      todos = toggleTodo(todos, todoId);
    },
    setFilter: (newFilter) => {
      filter = newFilter;
    },
    getTodos: () => filterTodos(todos, filter),
  };
};

const todoApp = createTodoApp();

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

// Function to render the todos based on the current filter
const renderTodos = () => {
  todoListElement.innerHTML = ""; // Clear the current list to avoid duplicates

  const todoElements = todoApp.getTodos().map(createTodoItem);
  todoListElement.append(...todoElements);
};

// Event handler to create a new todo item
const handleKeyDownToCreateNewTodo = (event) => {
  if (event.key === "Enter") {
    const todoText = event.target.value.trim();
    if (todoText) {
      todoApp.addTodo(todoText);
      event.target.value = ""; // Clear the input
      renderTodos();
    }
  }
};

// Helper function to find the target todo element
const findTargetTodoElement = (event) =>
  event.target.id?.includes("todo-text") ? event.target : null;

// Helper function to parse the todo id from the todo element
const parseTodoId = (todo) => (todo ? Number(todo.id.split("-").pop()) : -1);

// Event handler to toggle the completed status of a todo item
const handleClickOnTodoList = (event) => {
  todoApp.toggleTodo(parseTodoId(findTargetTodoElement(event)));
  renderTodos();
};

// Helper function to update the class list of a navbar element
const updateClassList = (element, isActive) => {
  const classes = [
    "underline",
    "underline-offset-4",
    "decoration-rose-800",
    "decoration-2",
  ];
  if (isActive) {
    element.classList.add(...classes);
  } else {
    element.classList.remove(...classes);
  }
};

// Helper function to render the navbar anchor elements
const renderTodoNavBar = (href) => {
  Array.from(todoNav.children).forEach((element) => {
    updateClassList(element, element.href === href);
  });
};

// Event handler to filter the todos based on the navbar selection
const handleClickOnNavbar = (event) => {
  // if the clicked element is an anchor tag
  if (event.target.tagName === "A") {
    const hrefValue = event.target.href;
    todoApp.setFilter(hrefValue.split("/").pop() || "all");
    renderTodoNavBar(hrefValue);
    renderTodos();
  }
};

// Add the event listeners
todoListElement.addEventListener("click", handleClickOnTodoList);
inputNewTodo.addEventListener("keydown", handleKeyDownToCreateNewTodo);
todoNav.addEventListener("click", handleClickOnNavbar);
document.addEventListener("DOMContentLoaded", renderTodos);
