const theme = document.getElementById("themeToggler");
const newTodo = document.getElementById("newTodoForm");
const todo = document.getElementById("todos");

const formCreate = document.getElementById("create-form");
const listGroupTodo = document.getElementById("list-group-todo");

// themeTOGLER
theme.onclick = () => {
  const currentTheme = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme =
    currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", document.documentElement.dataset.theme);
};

let todosList = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
if (todosList.length) showTodos();
//   settodo
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todosList));
}
function showTodos() {
  const todosList = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  todosList.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li onclick="setCompleted(${i})" class=" ${
      item.completed == true ? "complated" : ""
    }">
    ${item.text}
    </li> `;
  });
}
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  const todoText = formCreate["create-todo-input"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todosList.push({ text: todoText, completed: false });
    setTodos();
    showTodos();
  }
});

function deleteTodo(id) {
  const deletedTodos = todosList.filter((item, i) => {
    return i !== id;
  });
  todosList = deletedTodos;
  setTodos();
  showTodos();
}

function setCompleted(id) {
  const completeTodos = todosList.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todosList = completeTodos;
  setTodos();
  showTodos();
}
