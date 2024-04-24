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

document
    .getElementById('tsk-lst')
    .onmouseover = showActions;

document
    .getElementById('tsk-lst')
    .onmouseout = hideActions;

function markDone(elem) {
    debugger
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

    newTaskElem.innerHTML = `
    <div class="item-task">
        <input class="chbox-to-change" id="chbox-task-${task.id}" name="chbox-task-${task.id}" type="checkbox"
                onchange="markDone(this)">
        <label for="chbox-task-${task.id}">
            ${task.title}
        </label>
    </div>`;

    listElem.prepend(newTaskElem);
}