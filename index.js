let savedData = []

window.addEventListener("load", load);
window.addEventListener("beforeunload", save);

const submitBtn = document.getElementById("submit")
submitBtn.addEventListener("click", addTodoItem);

function addTodoItem(event) {
    event.preventDefault();
    let todoInput = document.getElementById("todo-input");
    if(todoInput.value.trim() != "") {
        let newTodo = Todo(todoInput.value, false);
        savedData.push(newTodo);
        renderTodo(savedData.length - 1, newTodo);

        todoInput.value = "";
    }
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
    let id = event.target.getAttribute("data-id")
    savedData[id].isDeleted = true;

    event.target.parentElement.remove()
    console.log(savedData);
}

function crossOutTodo(event) {
    let id = event.target.getAttribute("data-id")
    savedData[id].isDone = !savedData[id].isDone

    event.target.classList.toggle("strikethrough");
    console.log(savedData);
}

function renderTodo(id, todo) {
    let strikethrough = "";
    if(todo.isDone) {
        strikethrough = "strikethrough";
    }

    let todoDiv = createElt("div", "", null, {class: "todo-item"},
        createElt("div", "X", deleteTodo, {class: "delete-todo", "data-id": id}),
        createElt("div", todo.text, crossOutTodo, {class: `todo-text ${strikethrough}`, "data-id": id})
    );
    let todoList = document.getElementById("todo-list");
    // todoList.append(todoDiv);

    let todoForm = document.querySelector("#todo-form");
    todoList.insertBefore(todoDiv, todoForm);

    return todoDiv;
}

//TODO: implement save functionality before user leaves page
function save() {
    savedData = savedData.filter(data => !data.isDeleted)
    localStorage.setItem("todos", JSON.stringify(savedData));
}

//TODO: implement load functionality when user loads page
function load() {
    let savedDataString = localStorage.getItem("todos");
    if(savedDataString != null) {
        savedData = JSON.parse(savedDataString);
        for(let i = 0; i < savedData.length; i++) {
            renderTodo(i, savedData[i]);
        }
    } else {
        savedData = [];
    }
}

function Todo(text, isDone) {
    return {
        text: text,
        isDone: isDone,
        isDeleted: false,
    }
}