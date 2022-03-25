class task {
    constructor(text) {
        this.text = text;
        this.done = false;
    }

    changeDone()
    {
        if (this.done === true)
            this.done = false;
        else if (this.done === false)
            this.done = true;
    }
}

const showAllLabel = document.getElementById('showAllLbl');
const showDoneLabel =  document.getElementById('showDoneLbl');
const showNotDoneLabel =  document.getElementById('showNotDoneLbl');
const tasks = [];

function addBtnClick() {
    const str = document.getElementById("str");

    tasks.push(new task(str.value.toString()));

    outputTasks('All');
    str.value = "";
}

function showAllLblClick() {
    const showAllLabel = document.getElementById('showAllLbl');
    const showDoneLabel =  document.getElementById('showDoneLbl');
    const showNotDoneLabel =  document.getElementById('showNotDoneLbl');
    showAllLabel.setAttribute("class", "selectedClickable");
    showDoneLabel.setAttribute("class", "clickable");
    showNotDoneLabel.setAttribute("class", "clickable");
    outputTasks("All");
}

function showDoneLblClick() {
    const showAllLabel = document.getElementById('showAllLbl');
    const showDoneLabel =  document.getElementById('showDoneLbl');
    const showNotDoneLabel =  document.getElementById('showNotDoneLbl');
    showDoneLabel.setAttribute("class", "selectedClickable");
    showAllLabel.setAttribute("class", "clickable");
    showNotDoneLabel.setAttribute("class", "clickable");
    outputTasks("Done");
}

function showNotDoneLblClick() {
    const showAllLabel = document.getElementById('showAllLbl');
    const showDoneLabel =  document.getElementById('showDoneLbl');
    const showNotDoneLabel =  document.getElementById('showNotDoneLbl');
    showNotDoneLabel.setAttribute("class", "selectedClickable");
    showAllLabel.setAttribute("class", "clickable");
    showDoneLabel.setAttribute("class", "clickable");
    outputTasks("NotDone");
}

function outputTasks(mode) {
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
        if (currTask.done === true)
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
        ul.removeChild(li);
        let removedItem = tasks.splice(tasks.indexOf(currTask), 1);
    })
    li.appendChild(delBtn);
    li.addEventListener("mouseover", () => {
        if (currTask.done === true)
            li.setAttribute("class", "selectedFinishedElement");
        else
            li.setAttribute("class", "selectedElement");
    })
    li.addEventListener("mouseout", () => {
        if (currTask.done === true)
            li.setAttribute("class", "finishedElement");
        else
            li.setAttribute("class", "listElement");
    })
    ul.appendChild(li);
}
