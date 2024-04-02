let idCounter = 1; // will be using this value to give id to all the tasks that will pe populated
let allTasks = {}; // global object array that will contain all the tasks.
let completedTasks = {}; // global object array that will contain only the completed tasks
let incompleteTasks = {}; // global object array that will contain only the incompleted tasks
let completeAllTask = false; // using this variable to track the active and non active status of complete-all-tasks button;


//below function is used to check at all times if there any tasks present in allTask array or now, if none present then all the- 
// -things below input box will be hidden...
const showAllHandler = () => {
    const len = Object.keys(allTasks).length;
    if (len > 0)
        document.querySelector(".show-all").classList.remove("hidden");
    else
        document.querySelector(".show-all").classList.add("hidden");
}

// this function will be called when the left side input checkbox present in all task inside list will pe pressed.
const checkBoxHandler = (e) => {
    let parent = e.target.parentNode;
    let taskId = parent.id.split("-")[1];
    if (!completedTasks[taskId]) {
        completedTasks[taskId] = parent.querySelector("p").textContent;
        delete incompleteTasks[taskId];
        parent.querySelector("p").classList.add("strike");
    } else {
        delete completedTasks[taskId];
        incompleteTasks[taskId] = parent.querySelector("p").textContent;
        parent.querySelector("p").classList.remove("strike");
    }
    taskNumberUpdater();
}

//Similarly this function will be called to handle event when the delete button is pressed.
const deleteTaskHandler = (e) => {
    let parent = e.target.parentNode;
    let taskId = parent.id.split("-")[1];
    document.querySelector(".tasklist-box").removeChild(parent);
    delete allTasks[taskId];
    delete completedTasks[taskId];
    delete incompleteTasks[taskId];
    showAllHandler();
    taskNumberUpdater();
}

//To get the current task typed in the input text box and populate it in the global allTasks array.
const getTask = () => {
    let currTask = document.querySelector(".task-input");
    if(currTask.value === null || currTask.value.trim() === ""){
        alert("Please enter a task..");
        return;
    }
    allTasks[idCounter] = currTask.value.trim();
    incompleteTasks[idCounter] = currTask.value.trim(); // initally all tasks are incomplete so adding them in this array.
    idCounter++;
    currTask.value = "";
    renderTasks();
    showAllHandler();
    taskNumberUpdater();
}

//Creating this render function to show the tasks according to the buttons pressed (All, Incomplete, Complete)
//Using default value 1 so it is in insert task mode in the beginning..
const renderTasks = (value = 1) => {
    let idKeys = Object.keys(allTasks);
    let completedTaskKeys = Object.keys(completedTasks);
    let incompleteTaskKeys = Object.keys(incompleteTasks);
    taskNumberUpdater();

    document.querySelector(".tasklist-box").innerHTML = "";
    if (value === 1) {
        document.getElementById("all").classList.add("selected");
        document.getElementById("incomplete").classList.remove("selected");
        document.getElementById("completed").classList.remove("selected");
        let strike = "";
        idKeys.forEach((num) => {
            let completeTrue = completedTaskKeys.includes(num) ? true : false;
            document.querySelector(".tasklist-box").innerHTML +=
                `
                <div class="task" id="task-${num}">
                    <input type="checkbox" name="checkbox" ${completeTrue ? "checked" : ""}>
                    <p ${completeTrue ? "class=strike" : ""}>${allTasks[num]}</p>
                    <img class="delete-task" src="https://cdn.hugeicons.com/icons/remove-circle-half-dot-stroke-rounded.svg"
                        alt="remove-circle-half-dot" width="28" height="28" />
                </div>
            `
        });
    } else if (value === 2) {
        document.getElementById("all").classList.remove("selected");
        document.getElementById("incomplete").classList.add("selected");
        document.getElementById("completed").classList.remove("selected");
        incompleteTaskKeys.forEach((num) => {
            document.querySelector(".tasklist-box").innerHTML +=
                `
                <div class="task" id="task-${num}">
                    <input type="checkbox" name="checkbox">
                    <p>${incompleteTasks[num]}</p>
                    <img class="delete-task" src="https://cdn.hugeicons.com/icons/remove-circle-half-dot-stroke-rounded.svg"
                        alt="remove-circle-half-dot" width="28" height="28" />
                </div>
            `
        });
    } else {
        document.getElementById("all").classList.remove("selected");
        document.getElementById("incomplete").classList.remove("selected");
        document.getElementById("completed").classList.add("selected");
        completedTaskKeys.forEach((num) => {
            document.querySelector(".tasklist-box").innerHTML +=
                `
                <div class="task" id="task-${num}">
                    <input type="checkbox" name="checkbox" checked>
                    <p class="strike">${completedTasks[num]}</p>
                    <img class="delete-task" src="https://cdn.hugeicons.com/icons/remove-circle-half-dot-stroke-rounded.svg"
                        alt="remove-circle-half-dot" width="28" height="28" />
                </div>
            `
        })
    }
    // Adding the functionality of the complete and delete tasks button for only tha tasks rendered on the Tasks container..
    document.querySelectorAll(".task input").forEach((elem) => {
        elem.addEventListener("click", (e) => {
            checkBoxHandler(e);
        })
    });
    document.querySelectorAll(".task img").forEach((elem) => {
        elem.addEventListener("click", (e) => {
            deleteTaskHandler(e);
        })
    });
}

//Below Function is used to handle the event when Complete-all-tasks button is pressed --
const completeAllTaskHandler = () => {
    let allTaskKeys = Object.keys(allTasks);
    let completedTaskKeys = Object.keys(completedTasks);
    if (!completeAllTask) {
        allTaskKeys.forEach((key) => {
            if (!completedTaskKeys.includes(key))
                completedTasks[key] = allTasks[key];
            delete incompleteTasks[key];
        });
        console.log(completedTaskKeys);
        completeAllTask = true;
        renderTasks(3);
        document.querySelector(".tick").style.filter = "invert(0)"
    } else {
        allTaskKeys.forEach((key) => {
            incompleteTasks[key] = allTasks[key];
            delete completedTasks[key];
        });
        completeAllTask = false;
        renderTasks();
        document.querySelector(".tick").style.filter = "invert(0.8)"
    }
}

//Below function is used to handle the event when clear completed button is pressed--
const clearCompletedHandler = () => {
    let completedTaskKeys = Object.keys(completedTasks);
    completedTaskKeys.forEach((key) => {
        delete completedTasks[key];
        delete allTasks[key];
    })
    renderTasks();
    document.querySelector(".tick").style.filter = "invert(0.8)";
    showAllHandler();
}

//Task Number updater
const taskNumberUpdater = () => {
    document.getElementById("task-num").innerHTML = `#${Object.keys(incompleteTasks).length}`;
    createLocalStorage();
}

//Below function I am using to create a local storage of all the arrays, so that I can reuse the previous data when I relaunch the app.
const createLocalStorage = () => {
    let data = { idCounter, allTasks, completedTasks, incompleteTasks, completeAllTask };
    localStorage.setItem("data", JSON.stringify(data));
}

//Below function is used to restore the values from previous session if present.
const fetchLocalStorage = () => {
    let data = JSON.parse(localStorage.getItem("data")) || null;
    if(data === null)
        return;
    idCounter = data.idCounter;
    allTasks = data.allTasks;
    completedTasks = data.completedTasks;
    incompleteTasks = data.incompleteTasks;
    completeAllTask = data.completeAllTask;
    showAllHandler();
    renderTasks();
}

const deleteLocalStorage = () => {
    localStorage.clear();
}

document.querySelector(".add-btn").addEventListener("click", getTask);
document.querySelector(".task-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        getTask();
    }
});

//Below three are functions added to the 3 buttons of all, complete and incomplete...
document.getElementById("all").addEventListener("click", (e) => {
    renderTasks(1);
});
document.getElementById("incomplete").addEventListener("click", (e) => {
    renderTasks(2);
});
document.getElementById("completed").addEventListener("click", (e) => {
    renderTasks(3);
});
document.querySelector(".complete-task-btn").addEventListener("click", completeAllTaskHandler);
document.querySelector(".clear-completed-btn").addEventListener("click", clearCompletedHandler);
fetchLocalStorage();
