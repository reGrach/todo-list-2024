let maxNumberIdTask = 2;

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

        const listElem = document
            .getElementById('tsk-lst');

        const newTaskElem = document
            .createElement('li');

        newTaskElem.innerHTML = `
        <div class="item-task">
            <input class="chbox-to-change" id="chbox-task-${maxNumberIdTask}" name="chbox-task-${maxNumberIdTask}" type="checkbox"
                    onchange="markDone(this)">
            <label for="chbox-task-${maxNumberIdTask}">
                ${taskName}
            </label>
        </div>`;

        listElem.prepend(newTaskElem);
    }

    taskNameElem.value = '';
}