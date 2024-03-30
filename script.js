let idCounter = 1;
let allTasks = {};
let completed = {};
let incomplete = {};


const checkBoxHandler = (e) => {
    let parent = e.target.parentNode;
    let taskId = parent.id.split("-")[1];
    // completed[taskId] = parent.querySelector("p").textContent;
    // parent.querySelector("p").classList.toggle("strike");
    if(!completed[taskId]){
        completed[taskId] = parent.querySelector("p").textContent;
        parent.querySelector("p").classList.add("strike");
    } else {
        delete completed[taskId];
        parent.querySelector("p").classList.remove("strike");
    }
}

const deleteTaskHandler = (e) => {
    let parent = e.target.parentNode;
    let taskId = parent.id.split("-")[1];
    console.log(taskId)
    document.querySelector(".tasklist-box").removeChild(parent);
    delete allTasks[taskId];
    delete completed[taskId];
    delete incomplete[taskId];
}


const insertTask = () => {
    let idKeys = Object.keys(allTasks);
    console.log(idKeys)
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

const getTask = () => {
    let currTask = document.querySelector(".task-input");
    allTasks[idCounter++] = currTask.value.trim();
    incomplete[idCounter] = currTask.value.trim();
    currTask.value = "";
    insertTask();
}

document.querySelector(".add-btn").addEventListener("click", getTask);
document.querySelector(".task-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        getTask();
    }
});
