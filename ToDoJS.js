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

const tasks = [];

function addBtnClick() {
    const str = document.getElementById("str");
    let val = str.value.toString();
    console.log(val);

    tasks.push(new task(val));

    console.log(tasks);

    updateTasks();
    str.value = "";
}

function updateTasks() {
  const ul = document.getElementById("list");
  clearTasks(ul);
  outputTasks(ul);
}

function clearTasks(ul) {
  while (ul.firstChild)
    ul.removeChild(ul.firstChild);
}

function outputTasks(ul) {
    for (let currTask of tasks) {
      const str = currTask.text;
      const li = document.createElement("li");
      li.setAttribute("class", "listElement");

      const chk = document.createElement("input");
      chk.setAttribute("type", "checkbox");
      chk.setAttribute("class", "listCheckbox");
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
          let removedItem = tasks.splice(tasks.indexOf(currTask),1);
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
}
