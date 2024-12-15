const textInput = document.getElementById("textInput"),
      addButton = document.getElementById("buttonInput"),
      filterOptions = document.getElementsByClassName("filter-option"),
      todoList = document.getElementById("list");

let tasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addButton.onclick = () => {
    if (textInput.value === "") {
        alert("The input shouldn't be empty");
    } else {
        tasks.push({ value: textInput.value, status: 'active', id: Date.now() });
        updateLocalStorage();
        renderTasks();
    }
    textInput.value = "";
}

function toggleTaskStatus(event) {
    const taskId = event.currentTarget.dataset.id;

    tasks = tasks.map(task => {
        if (task.id == taskId) {
            task.status = task.status === "active" ? "completed" : "active";
        }
        return task;
    });
    updateLocalStorage();
    renderTasks();
}

function deleteTask(event) {
    const taskId = event.currentTarget.dataset.id;
    tasks = tasks.filter(task => task.id != taskId);
    updateLocalStorage();
    renderTasks();
}

function generateTaskListHTML(filter) {
    return tasks.filter(filter).map(task => `
        <li class="todo-item" data-status="${task.status}">
            <div class="todo-content" onclick="toggleTaskStatus(event)" data-id="${task.id}">
                <span class="checkBox" data-id="${task.id}"></span>
                <p class="todo-text" data-id="${task.id}">${task.value}</p>
            </div>
            <div class="delete-icon" onclick="deleteTask(event)" data-id="${task.id}">
                <i class="fa-solid fa-trash-can"></i>
            </div>
        </li>
    `).join("");
}

function renderTasks() {
    todoList.innerHTML = generateTaskListHTML(() => true);
}

Array.from(filterOptions).forEach((button, index) => {
    button.onclick = () => {
        Array.from(filterOptions).forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        if (index === 0) {
            renderTasks();
        } else if (index === 1) {
            todoList.innerHTML = generateTaskListHTML(task => task.status === 'active');
        } else if (index === 2) {
            todoList.innerHTML = generateTaskListHTML(task => task.status === 'completed');
        }
    };
});

renderTasks();
