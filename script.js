const form = document.querySelector("form");
const input = document.getElementById("addTask");
const list = document.getElementById("todo-list");

const allFilterButton = document.getElementById("filter-all");
const activeFilterButton = document.getElementById("filter-active");
const completedFilterButton = document.getElementById("filter-completed");

let editingId = null;
let currentFilter = "all";

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

function updateFilterButtons() {
  allFilterButton.setAttribute(
    "aria-pressed",
    currentFilter === "all"
  );

  activeFilterButton.setAttribute(
    "aria-pressed",
    currentFilter === "active"
  );

  completedFilterButton.setAttribute(
    "aria-pressed",
    currentFilter === "completed"
  );
}

function createTodoItem(todo) {
  const item = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.setAttribute("aria-label", `Mark "${todo.text}" as completed`);

  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    renderTodos();
  });

  const isEditing = todo.id === editingId;

  if (isEditing) {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;
    editInput.setAttribute("aria-label", `Edit text for "${todo.text}"`);

    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const newText = editInput.value.trim();

        if (newText === "") return;

        todo.text = newText;
        editingId = null;
        renderTodos();
      } else if (event.key === "Escape") {
        editingId = null;
        renderTodos();
      }
    });

    editInput.focus();

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";

    saveButton.setAttribute(
      "aria-label",
      `Save changes to "${todo.text}"`
    );

    saveButton.addEventListener("click", function () {
      const newText = editInput.value.trim();

      if (newText === "") return;

      todo.text = newText;
      editingId = null;
      renderTodos();
    });

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    cancelButton.setAttribute(
      "aria-label",
      `Cancel editing "${todo.text}"`
    );

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

  editButton.setAttribute(
    "aria-label",
    `Edit "${todo.text}"`
  );

  editButton.addEventListener("click", function () {
    editingId = todo.id;
    renderTodos();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute(
    "aria-label",
    `Delete "${todo.text}"`
  );

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

  const visibleTodos = todos.filter(function (todo) {
    if (currentFilter === "active") {
      return todo.completed === false;
    }

    if (currentFilter === "completed") {
      return todo.completed === true;
    }

    return true;
  });

  if (visibleTodos.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.classList.add("empty-state");

    if (currentFilter === "active") {
      emptyMessage.textContent =
        "🎉 No active tasks. You're all caught up!";
    } else if (currentFilter === "completed") {
      emptyMessage.textContent =
        "No completed tasks yet. Keep going!";
    } else {
      emptyMessage.textContent =
        "Your todo list is empty. Add a task to get started!";
    }

    list.append(emptyMessage);
    saveTodos();
    return;
  }

  visibleTodos.forEach(function (todo) {
    list.append(createTodoItem(todo));
  });

  saveTodos();
}

allFilterButton.addEventListener("click", function () {
  currentFilter = "all";
  updateFilterButtons();
  renderTodos();
});

activeFilterButton.addEventListener("click", function () {
  currentFilter = "active";
  updateFilterButtons();
  renderTodos();
});

completedFilterButton.addEventListener("click", function () {
  currentFilter = "completed";
  updateFilterButtons();
  renderTodos();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  const newTodo = {
    id: crypto.randomUUID(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  renderTodos();
  input.value = "";
  input.focus();
});

updateFilterButtons();
renderTodos();