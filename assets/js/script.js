// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

function getTaskColor(dueDate, status) {
    if (status === "done") {
        return ''; // Default color for done tasks
    }

    const today = dayjs();
    const due = dayjs(dueDate);
    if (due.isBefore(today, 'day')) {
        return 'bg-danger'; // Red for overdue tasks
    } else if (due.diff(today, 'day') <= 3) {
        return 'bg-warning'; // Yellow for tasks nearing the deadline
    } else {
        return ''; // Default color
    }
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskColor = getTaskColor(task.dueDate, task.status);
    return `
    <div class="card mb-3 ${taskColor}" data-id="${task.id}">
      <div class="card-header"><h4>${task.title}</h4></div>
      <div class="card-body p-3">
        <h6 class="card-title">${task.description}</h6>
        <h5 class="card-subtitle mb-2 text-muted">${task.dueDate}</h5>
        <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
      </div>
    </div>
  `;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
