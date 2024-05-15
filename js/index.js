const keyStorage = 'key_task';
let myTaskList = [];
let maxNumberIdTask = 1;

// Пытаемся получить массив задач из хранилища
let storageData = localStorage.getItem(keyStorage);

if (storageData != null) {
    myTaskList = JSON.parse(storageData);
    maxNumberIdTask = myTaskList
        .map(x => x.id)
        .reduce((a, b) => Math.max(a, b), -Infinity);

    myTaskList.forEach(t => renderTaskItem(t));
}

document
    .getElementById('add-btn')
    .onclick = addNewTask;

function markDone(elem) {
    let labelElem = document.querySelector(`[for="${elem.id}"]`);
    if (elem.checked) {
        labelElem.style.textDecoration = 'line-through';
    } else {
        labelElem.style.textDecoration = 'none';
    }
}

function showActions(ev) {
    const btn = document.createElement('button');
    btn.innerText = 'Удалить'
    ev.target.append(btn);
}

function hideActions(ev) {
    const btn = ev.target.getElementsByTagName('button').item(0);
    btn.parentNode.removeChild(btn);
}

document.addEventListener('keydown', check)

function check(ev) {
    if (ev.key === 'Enter') {
        addNewTask();
    }
}

function addNewTask() {
    const taskNameElem = document
        .getElementById('tsk-inp');

    const taskName = taskNameElem.value.trim();

    if (taskName) {
        maxNumberIdTask++;

        let newTask = {
            id: maxNumberIdTask,
            title: taskName,
        };

        myTaskList.push(newTask); //добавляем новую задачу в наш список
        renderTaskItem(newTask); // отрисовываем новую задачу
        localStorage.setItem(keyStorage, JSON.stringify(myTaskList)); // обновляем запись в хранилище
    }

    taskNameElem.value = '';
}

function renderTaskItem(task) {

    const listElem = document
        .getElementById('tsk-lst');

    const newTaskElem = document
        .createElement('li');

    newTaskElem.innerHTML =
        `<li class="list-group-item">
            <input  class="form-check-input me-1"
                    type="checkbox"
                    id="chbox-task-${task.id}"
                    onchange="markDone(this)">
            <label  class="form-check-label stretched-link"
                    for="chbox-task-${task.id}">
                    ${task.title}
            </label>
        </li>`;

    listElem.prepend(newTaskElem);
}