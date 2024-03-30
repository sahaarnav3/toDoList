let idCounter = 1; // will be using this value to give id to all the tasks that will pe populated
let allTasks = {}; // global object array that will contain all the tasks.
let completed = {}; // global object array that will contain only the completed tasks
let incomplete = {}; // global object array that will contain only the incompleted tasks


// this function will be called when the left side input checkbox present in all task inside list will pe pressed.
const checkBoxHandler = (e) => {
    let parent = e.target.parentNode;
    let taskId = parent.id.split("-")[1];
    if (!completed[taskId]) {
        completed[taskId] = parent.querySelector("p").textContent;
        delete incomplete[taskId];
        parent.querySelector("p").classList.add("strike");
    } else {
        delete completed[taskId];
        incomplete[taskId] = parent.querySelector("p").textContent;
        parent.querySelector("p").classList.remove("strike");
    }
}

//Similarly this function will be called to handle event when the delete button is pressed.
const deleteTaskHandler = (e) => {
    let parent = e.target.parentNode;
    let taskId = parent.id.split("-")[1];
    console.log(taskId)
    document.querySelector(".tasklist-box").removeChild(parent);
    delete allTasks[taskId];
    delete completed[taskId];
    delete incomplete[taskId];
    console.log(allTasks, incomplete);
}


// This function is used to handle the add task button function 
const insertTask = () => {
    let idKeys = Object.keys(allTasks);
    document.querySelector(".tasklist-box").innerHTML = "";
    idKeys.forEach((num) => {
        document.querySelector(".tasklist-box").innerHTML +=
            `
        <div class="task" id="task-${num}">
            <input type="checkbox" name="checkbox">
            <p>${allTasks[num]}</p>
            <img class="delete-task" src="https://cdn.hugeicons.com/icons/remove-circle-half-dot-stroke-rounded.svg"
                alt="remove-circle-half-dot" width="28" height="28" />
        </div>
        `
    });
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

//To get the current task typed in the input text box and populate it in the global allTasks array.
const getTask = () => {
    let currTask = document.querySelector(".task-input");
    allTasks[idCounter] = currTask.value.trim();
    incomplete[idCounter] = currTask.value.trim(); // initally all tasks are incomplete so adding them in this array.
    idCounter++;
    currTask.value = "";
    insertTask();
}

//Creating this render function to show the tasks according to the buttons pressed (All, Incomplete, Complete)
const renderTasks = (value = 1) => {
    let idKeys = Object.keys(allTasks);
    let completedTaskKeys = Object.keys(completed);
    let incompleteTaskKeys = Object.keys(incomplete);

    document.querySelector(".tasklist-box").innerHTML = "";
    if (value === 1) {
        let strike = "";
        idKeys.forEach((num) => {
            document.querySelector(".tasklist-box").innerHTML +=
                `
                <div class="task" id="task-${num}">
                    <input type="checkbox" name="checkbox">
                    <p class="${completedTaskKeys.includes(num) ? "strike" : ""}">${allTasks[num]}</p>
                    <img class="delete-task" src="https://cdn.hugeicons.com/icons/remove-circle-half-dot-stroke-rounded.svg"
                        alt="remove-circle-half-dot" width="28" height="28" />
                </div>
            `
        });
    } else if (value === 2) {
        incompleteTaskKeys.forEach((num) => {
            document.querySelector(".tasklist-box").innerHTML +=
            `
                <div class="task" id="task-${num}">
                    <input type="checkbox" name="checkbox">
                    <p>${incomplete[num]}</p>
                    <img class="delete-task" src="https://cdn.hugeicons.com/icons/remove-circle-half-dot-stroke-rounded.svg"
                        alt="remove-circle-half-dot" width="28" height="28" />
                </div>
            `
        });
    } else {
        completedTaskKeys.forEach((num) => {
            document.querySelector(".tasklist-box").innerHTML +=
            `
                <div class="task" id="task-${num}">
                    <input type="checkbox" name="checkbox">
                    <p class="strike">${completed[num]}</p>
                    <img class="delete-task" src="https://cdn.hugeicons.com/icons/remove-circle-half-dot-stroke-rounded.svg"
                        alt="remove-circle-half-dot" width="28" height="28" />
                </div>
            `
        })
    }
}

document.querySelector(".add-btn").addEventListener("click", getTask);
document.querySelector(".task-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        getTask();
    }
});
document.getElementById("all").addEventListener("click", (e) => {
    renderTasks(1);
});
document.getElementById("incomplete").addEventListener("click", (e) => {
    renderTasks(2);
});
document.getElementById("completed").addEventListener("click", (e) => {
    renderTasks(3);
});
