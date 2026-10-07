const form = document.querySelector("form");
const input = document.getElementById("addTask");
const list = document.getElementById("todo-list");

const todos = [
  {
    id: 1,
    text: "Learn JavaScript",
    completed: false
  },
  {
    id: 2,
    text: "Build Todo app",
    completed: false
  }
];

function renderTodos() {
  list.innerHTML = "";

  todos.forEach(function (todo) {
    const item = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function () {
      todo.completed = checkbox.checked;
      renderTodos();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    renderTodos();
    });

    item.append(checkbox);
    const textSpan = document.createElement("span");
textSpan.textContent = todo.text;

item.append(textSpan);
    item.append(deleteButton);

    if (todo.completed) {
      textSpan.classList.add("completed");
    }

    list.append(item);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);

  renderTodos();

  input.value = "";
  input.focus();
});

renderTodos();