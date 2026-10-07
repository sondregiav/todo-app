const form = document.querySelector("form");
const input = document.getElementById("addTask");
const list = document.getElementById("todo-list");

let editingId = null;

const starterTodos = [
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

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos === null) {
    return starterTodos;
  }

  try {
    const parsedTodos = JSON.parse(savedTodos);

    if (Array.isArray(parsedTodos)) {
      return parsedTodos;
    }

    return starterTodos;
  } catch (error) {
    return starterTodos;
  }
}

const todos = loadTodos();

function saveTodos() {
  const todosJSON = JSON.stringify(todos);
  localStorage.setItem("todos", todosJSON);
}

function createTodoItem(todo) {
  const item = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    renderTodos();
  });

  const isEditing = todo.id === editingId;

  if (isEditing) {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;

    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const newText = editInput.value.trim();

        if (newText === "") return;

        todo.text = newText;
        editingId = null;
        renderTodos();
      }
    });

    editInput.focus();

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";

    saveButton.addEventListener("click", function () {
      const newText = editInput.value.trim();

      if (newText === "") return;

      todo.text = newText;
      editingId = null;
      renderTodos();
    });

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", function () {
      editingId = null;
      renderTodos();
    });

    item.append(checkbox, editInput, saveButton, cancelButton);

    return item;
  }

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;

  if (todo.completed) {
    textSpan.classList.add("completed");
  }

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", function () {
    editingId = todo.id;
    renderTodos();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", function () {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    renderTodos();
  });

  item.append(checkbox, textSpan, editButton, deleteButton);

  return item;
}

function renderTodos() {
  list.innerHTML = "";

  todos.forEach(function (todo) {
    list.append(createTodoItem(todo));
  });

  saveTodos();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") return;

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