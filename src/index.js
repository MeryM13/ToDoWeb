class task {
    constructor(text) {
        this.text = text;
        this.done = false;
    }

    changeDone()
    {
        this.done = !this.done;
    }
}

let taskCount = 0;
let doneCount = 0;
let notCount = 0;
const tasks = [];

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", addBtnClick);

const showAllLabel = document.getElementById('showAllLbl');
showAllLabel.addEventListener("click", showAllLblClick);

const showDoneLabel =  document.getElementById('showDoneLbl');
showDoneLabel.addEventListener("click", showDoneLblClick);

const showNotDoneLabel =  document.getElementById('showNotDoneLbl');
showNotDoneLabel.addEventListener("click", showNotDoneLblClick);

function countTasks() {
    taskCount = 0;
    doneCount = 0;
    notCount = 0;
    for (let task of tasks) {
        taskCount++;
        if (task.done) {
            doneCount++;
        } else {
            notCount++;
        }
    }
    showAllLabel.innerText = "All("+taskCount+")";
    showDoneLabel.innerText = "Done("+doneCount+")";
    showNotDoneLabel.innerText = "Not done("+notCount+")";
}

function addBtnClick() {
    const str = document.getElementById("str");

    tasks.push(new task(str.value.toString()));

    outputTasks('All');
    str.value = "";
}

function showAllLblClick() {
    showAllLabel.setAttribute("class", "selectedClickable");
    showDoneLabel.setAttribute("class", "clickable");
    showNotDoneLabel.setAttribute("class", "clickable");
    outputTasks("All");
}

function showDoneLblClick() {
    showDoneLabel.setAttribute("class", "selectedClickable");
    showAllLabel.setAttribute("class", "clickable");
    showNotDoneLabel.setAttribute("class", "clickable");
    outputTasks("Done");
}

function showNotDoneLblClick() {
    showNotDoneLabel.setAttribute("class", "selectedClickable");
    showAllLabel.setAttribute("class", "clickable");
    showDoneLabel.setAttribute("class", "clickable");
    outputTasks("NotDone");
}

function outputTasks(mode) {
    countTasks();
    const ul = document.getElementById("list");
    while (ul.firstChild)
        ul.removeChild(ul.firstChild);
    if (mode === "All") {
        for (let currTask of tasks) {
            outputTask(ul, currTask);
        }
    } else if (mode === "Done") {
        for (let currTask of tasks) {
            if (currTask.done) {
                outputTask(ul, currTask);
            }
        }
    } else if (mode === "NotDone") {
        for (let currTask of tasks) {
            if (!(currTask.done)) {
                outputTask(ul, currTask);
            }
        }
    }
}

function outputTask(ul, currTask)
{
    const str = currTask.text;
    const li = document.createElement("li");
    li.setAttribute("class", "listElement");

    const chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    chk.setAttribute("class", "listCheckbox");
    if (currTask.done)
        chk.checked = true;
    chk.addEventListener("click", () => {
        currTask.changeDone();
        countTasks();
        if (currTask.done)
            li.setAttribute("class", "finishedElement");
        else
            li.setAttribute("class", "listElement");
    })
    li.appendChild(chk);

    const text = document.createElement("span");
    text.innerText = str;
    text.setAttribute("class", "listStr");
    li.appendChild(text);

    const delBtn = document.createElement("button");
    delBtn.innerText = "x";
    delBtn.setAttribute("class", "listButton");
    delBtn.addEventListener("click", () => {
        countTasks();
        ul.removeChild(li);
        let removedItem = tasks.splice(tasks.indexOf(currTask), 1);
    })
    li.appendChild(delBtn);
    li.addEventListener("mouseover", () => {
        if (currTask.done)
            li.setAttribute("class", "selectedFinishedElement");
        else
            li.setAttribute("class", "selectedElement");
    })
    li.addEventListener("mouseout", () => {
        if (currTask.done)
            li.setAttribute("class", "finishedElement");
        else
            li.setAttribute("class", "listElement");
    })
    ul.appendChild(li);
}
