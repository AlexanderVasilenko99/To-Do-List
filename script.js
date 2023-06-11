let alexTasks = [];
getData();
setDate();
setTime();


//  ---------------------------------------------- PRIMARY FUNCTIONS ----------------------------------------------


// function gets data from LS and reboots array
function getData() {
    data = localStorage.getItem("alexTasks");
    if (data) {
        alexTasks = JSON.parse(data);
        displayTasks();
    }
}
// function displays data from LS
function displayTasks() {
    let ul = document.getElementById("task-gallery");
    let html = "";
    for (let task of alexTasks) {
        html += `<li onmouseover="displayX(${task.i})" onmouseout="removeX(${task.i})"><div class="li-text">${task.text}</div>
                     <div class="li-date">${task.date}</div>
                     <div class="li-time">${task.time}</div>
                     <div class="li-btn"><img onclick="removeTask(${task.i})" class="img" src="assets/images/delete-button.png" alt=""></div></li>`
    }
    ul.innerHTML = html;
}
// function updates LS
function saveData() {
    str = JSON.stringify(alexTasks);
    localStorage.setItem("alexTasks", str);
}
// function removes task 
function removeTask(i) {
    alexTasks.splice(i, 1)

    updateIndexes();
    saveData();
    displayTasks();
}
// function updates task indexes after a change in "alexTasks" array
function updateIndexes() {
    let i = 0;
    if (alexTasks != []) {
        for (let task of alexTasks) {
            task.i = i;
            i++;
        }
    }
}
// MAIN FUNCTION
function addTask() {
    event.preventDefault();
    let text = document.getElementById("text");
    let date = document.getElementById("date");
    
    // a conversion from yyyy-mm-dd format to dd-mm-yyyy 
    let myDate = new Date(date.value);
    date = myDate.toLocaleDateString("en-GB");

    let time = document.getElementById("time");
    let i = alexTasks.length;
    let form = document.getElementById("form");

    let task = { text: text.value, date: date, time: time.value, i: i };
    alexTasks.push(task);

    saveData();
    displayTasks();

    form.reset();
    text.focus();
    setDate();
    setTime();
}


//  --------------------------------------------- SECONDARY FUNCTIONS ---------------------------------------------


// function returns current date in "yyyy-mm-dd" format
function getDate() {

    let curDate = new Date;
    let curDay = curDate.getDate();
    let curMonth = curDate.getMonth() + 1;
    let curYear = curDate.getFullYear();
    let dateStr = ``;

    if (curDay < 10 && curMonth < 10) {
        dateStr = `${curYear}-0${curMonth}-0${curDay}`;
    }
    else if (curDay < 10 && curMonth >= 10) {
        dateStr = `${curYear}-${curMonth}-0${curDay}`;
    }
    else if (curDay >= 10 && curMonth < 10) {
        dateStr = `${curYear}-0${curMonth}-${curDay}`;
    }
    else { dateStr = `${curYear}-${curMonth}-${curDay}`; }
    return dateStr;
}
// functions sets min value of date input to current date
function setDate() {
    let curDate = getDate();
    let date = document.getElementById("date");

    date.min = curDate;
    date.value = curDate;
}
// function returns current time in "hh:mm" format
function getTime() {
    let curDate = new Date;
    let curMinutes = curDate.getMinutes();
    let curHours = curDate.getHours();
    let str = ``;

    // CHECK CASE WHEN HOUR/MINUTE IS UNDER 10
    if (curHours < 10 && curMinutes < 10) {
        str = `0${curHours}:0${curMinutes}`;
    }
    else if (curHours < 10 && curMinutes >= 10) {
        str = `0${curHours}:${curMinutes}`;
    }
    else if (curHours >= 10 && curMinutes < 10) {
        str = `${curHours}:0${curMinutes}`;
    }
    else { str = `${curHours}:${curMinutes}`; }
    return str;
}
// function sets value of time input to current time
function setTime() {
    let curTime = getTime();
    let time = document.getElementById("time");
    time.value = curTime;
}
// function shows X button onmouseover li
function displayX(i) {
    let image = document.getElementsByClassName("img")[i];
    image.style.height = "30px";
}
// function deletes X button onmouseout li
function removeX(i) {
    let image = document.getElementsByClassName("img")[i];
    image.style.height = "0px";
}
