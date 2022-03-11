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

const tasks = new Set();

function addBtnClick() {
    const str = document.getElementById("str");
    const ul = document.getElementById("list");
    const li = document.createElement("li");
    li.setAttribute("class", "listElement");

    let currTask = task.constructor(str);
    tasks.add(currTask);

    const chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    chk.setAttribute("class", "listCheckbox");
    chk.onclick = currTask.changeDone();
    li.appendChild(chk);

    const text = document.createElement("span");
    text.innerText = str.value;
    text.setAttribute("class", "listStr");
    li.appendChild(text);

    const delBtn = document.createElement("button");
    delBtn.innerText = "x";
    delBtn.setAttribute("class", "listButton");
    delBtn.addEventListener("click", () => {
        ul.removeChild(li);
    })
    li.appendChild(delBtn);
    li.addEventListener("mouseover", () => {
        li.setAttribute("class", "selectedElement");
    })

    ul.appendChild(li);

    str.value = "";
}

function taskDone(const )
{

}