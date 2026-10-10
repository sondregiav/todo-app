const form = document.querySelector("form");
const input = document.getElementById("addTask");
const list = document.getElementById("todo-list");

const allFilterButton = document.getElementById("filter-all");
const activeFilterButton = document.getElementById("filter-active");
const completedFilterButton = document.getElementById("filter-completed");
const activeCount = document.getElementById("active-count");

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

function updateActiveCount() {
  const count = todos.filter(function (todo) {
    return !todo.completed;
  }).length;

  activeCount.textContent =
    `${count} ${count === 1 ? "task" : "tasks"} remaining`;
}

function updateFilterButtons() {
  allFilterButton.setAttribute(
    "aria-pressed",
    String(currentFilter === "all")
  );

  activeFilterButton.setAttribute(
    "aria-pressed",
    String(currentFilter === "active")
  );

  completedFilterButton.setAttribute(
    "aria-pressed",
    String(currentFilter === "completed")
  );
}

function createTodoItem(todo) {
  const item = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  checkbox.setAttribute(
    "aria-label",
    `Mark "${todo.text}" as completed`
  );

  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;

    saveTodos();
    renderTodos();
  });

  const isEditing = todo.id === editingId;

  if (isEditing) {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;
    editInput.classList.add("edit-input");

    editInput.setAttribute(
      "aria-label",
      `Edit text for "${todo.text}"`
    );

    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();

        const newText = editInput.value.trim();

        if (newText === "") return;

        todo.text = newText;
        editingId = null;

        saveTodos();
        renderTodos();
      } else if (event.key === "Escape") {
        editingId = null;
        renderTodos();
      }
    });

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";

    saveButton.setAttribute(
      "aria-label",
      `Save changes to "${todo.text}"`
    );

    saveButton.addEventListener("click", function () {
      const newText = editInput.value.trim();

      if (newText === "") {
        editInput.focus();
        return;
      }

      todo.text = newText;
      editingId = null;

      saveTodos();
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

    item.append(
      checkbox,
      editInput,
      saveButton,
      cancelButton
    );

    return item;
  }

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;

  if (todo.completed) {
    textSpan.classList.add("completed");
  }

  const editButton = document.createElement("button");
  editButton.type = "button";
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
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  deleteButton.setAttribute(
    "aria-label",
    `Delete "${todo.text}"`
  );

  deleteButton.addEventListener("click", function () {
    const index = todos.indexOf(todo);

    if (index === -1) return;

    todos.splice(index, 1);

    if (editingId === todo.id) {
      editingId = null;
    }

    saveTodos();
    renderTodos();
  });

  item.append(
    checkbox,
    textSpan,
    editButton,
    deleteButton
  );

  return item;
}

function renderTodos() {
  list.innerHTML = "";

  // Count all incomplete todos, regardless of the current filter.
  updateActiveCount();

  const visibleTodos = todos.filter(function (todo) {
    if (currentFilter === "active") {
      return !todo.completed;
    }

    if (currentFilter === "completed") {
      return todo.completed;
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

  // Restore focus to the editing input after rendering.
  if (editingId !== null) {
    const editInput = list.querySelector(".edit-input");

    if (editInput) {
      editInput.focus();
      editInput.select();
    }
  }

  saveTodos();
}

function setFilter(filter) {
  currentFilter = filter;
  editingId = null;

  updateFilterButtons();
  renderTodos();
}

allFilterButton.addEventListener("click", function () {
  setFilter("all");
});

activeFilterButton.addEventListener("click", function () {
  setFilter("active");
});

completedFilterButton.addEventListener("click", function () {
  setFilter("completed");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    input.focus();
    return;
  }

  const newTodo = {
    id: crypto.randomUUID(),
    text: text,
    completed: false
  };

  todos.push(newTodo);

  // Show the newly added task immediately.
  currentFilter = "all";
  editingId = null;

  updateFilterButtons();
  saveTodos();
  renderTodos();

  input.value = "";
  input.focus();
});

updateFilterButtons();
renderTodos();