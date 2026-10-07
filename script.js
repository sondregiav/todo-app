const form = document.querySelector("form");
const input = document.getElementById("addTask");
const list = document.getElementById("todo-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    return;
  }
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
    input.value = "";
    input.focus();
});