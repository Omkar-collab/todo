document.getElementById('add-task-button').addEventListener('click', addTask);
document.getElementById('clear-completed-button').addEventListener('click', clearCompletedTasks);
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', filterTasks);
});

document.getElementById('complete-all-tasks-button').addEventListener('click', completeAllTasks);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDate = document.getElementById('due-date');
    const validationMessage = document.getElementById('validation-message');

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    if (!taskInput.value.trim() || !dueDate.value) {
        validationMessage.textContent = "Task description and due date cannot be empty.";
        return;
    }

    if (dueDate.value < today) {
        validationMessage.textContent = "Due date cannot be in the past.";
        return;
    }

    validationMessage.textContent = "";

    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.textContent = `${taskInput.value} - Due: ${dueDate.value}`;
    taskItem.dataset.dueDate = dueDate.value;

    taskItem.addEventListener('click', toggleTaskCompletion);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);
    deleteButton.style.backgroundColor = "#007bff";
    deleteButton.style.color = "white";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "5px";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.cursor = "pointer";

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    sortTasksByDueDate();

    taskInput.value = '';
    dueDate.value = '';
    checkAllTasksCompleted();
}

function toggleTaskCompletion(event) {
    event.target.classList.toggle('completed');
    checkAllTasksCompleted();
}

function deleteTask(event) {
    event.target.parentElement.remove();
    checkAllTasksCompleted();
}

function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll('#task-list li.completed');
    completedTasks.forEach(task => task.remove());
}

function filterTasks(event) {
    const filter = event.target.dataset.filter;
    const tasks = document.querySelectorAll('#task-list li');

    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = '';
                break;
            case 'active':
                task.style.display = task.classList.contains('completed') ? 'none' : '';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? '' : 'none';
                break;
        }
    });
}

function sortTasksByDueDate() {
    const taskList = document.getElementById('task-list');
    const tasks = Array.from(taskList.children);

    tasks.sort((a, b) => new Date(a.dataset.dueDate) - new Date(b.dataset.dueDate));

    tasks.forEach(task => taskList.appendChild(task));
}

function checkAllTasksCompleted() {
    const tasks = document.querySelectorAll('#task-list li');
    const allCompleted = Array.from(tasks).every(task => task.classList.contains('completed'));

    if (allCompleted && tasks.length > 0) {
        document.body.style.backgroundImage = "url('download1.jpg')";
    } else {
        document.body.style.backgroundImage = "";
    }
}

function completeAllTasks() {
    const tasks = document.querySelectorAll('#task-list li');
    tasks.forEach(task => task.classList.add('completed'));
    checkAllTasksCompleted();
}
