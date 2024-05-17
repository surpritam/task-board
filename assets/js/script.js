// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

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
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();
    taskList.forEach(task => {
        let taskCard = createTaskCard(task);
        console.log(task.status);
        $(`#${task.status}-cards`).append(taskCard);
    });

    $(".delete-task").click(handleDeleteTask);
    $(".card").draggable({
        helper: "clone",
        appendTo: "body", // Ensure the task remains visible while dragging
        start: function (event, ui) {
            $(ui.helper).css("z-index", 1000); // Ensure the dragged item is on top
        }
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const task = {
        id: generateTaskId(),
        title: $("#taskTitle").val(),
        description: $("#taskDescription").val(),
        dueDate: $("#taskDueDate").val(),
        status: "todo"
    };
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));

    $("#formModal").modal('hide');
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).data("id");
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data("id");
    const newStatus = $(event.target).closest(".lane").attr("id");
    const task = taskList.find(task => task.id === taskId);
    task.status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $("#taskForm").submit(handleAddTask);

    $(".lane").droppable({
        drop: handleDrop
    });

    $("#taskDueDate").datepicker();
});
