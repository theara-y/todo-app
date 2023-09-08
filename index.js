const submitBtn = document.getElementById("submit")
submitBtn.addEventListener("click", addTodoItem);

function addTodoItem(event) {
    event.preventDefault();
    let todoInput = document.getElementById("todo-input");
    renderTodo(todoInput.value);
    todoInput.value = "";
}

function createElt(name, text, eventHandler, attributes, ...children) {
    let elt = document.createElement(name);

    elt.textContent = text;

    if(eventHandler != null) elt.addEventListener("click", eventHandler);

    Object.keys(attributes).forEach(key => elt.setAttribute(key, attributes[key]));
    children.forEach(child => elt.appendChild(child));
    return elt;
}

function deleteTodo(event) {
    event.target.parentElement.remove()
}

function crossOutTodo(event) {
    event.target.classList.toggle("strikethrough");
}

function renderTodo(todoText) {
    let todoDiv = createElt("div", "", null, {class: "todo-item"},
        createElt("div", "X", deleteTodo, {class: "delete-todo"}),
        createElt("div", todoText, crossOutTodo, {class: "todo-text"})
    );
    let todoList = document.getElementById("todo-list");
    // todoList.append(todoDiv);

    let todoForm = document.querySelector("#todo-form");
    todoList.insertBefore(todoDiv, todoForm);

    return todoDiv;
}

//TODO: implement save functionality before user leaves page
function save() {
    localStorage.setItem("todos", "todos");
}

//TODO: implement load functionality when user loads page