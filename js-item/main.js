//logout button
document.getElementById("logout").addEventListener("click", function() {
    localStorage.removeItem("userData");
    window.location.href = "login.html"; 
});


//Time
window.onload = function() {
    let greetingElement = document.getElementById("time");
    let greeting = getGreeting();
    greetingElement.innerHTML = greeting;
    greetingElement.style.color = '#2ECC71';
}

function getGreeting(){
    let now = new Date();
    let hour = now.getHours();;

    let greeting = "";
    if(hour >= 5 && hour < 12){
        greeting = "~ Good Morning ~";
    }else if (hour >=12 && hour <15){
        greeting = "~ Good afternoon ~";
    }else if (hour >=15 && hour <18){
        greeting = "~ Good Evening ~";
    }else {
        greeting = "~ Good Night ~";
    }

    return greeting;
}; 

//MAIN PROGRAM
const task = [];
const RENDER_EVENT = 'render-task';

document.addEventListener('DOMContentLoaded', function(){
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function(e){
        e.preventDefault();
        addTask();
    })

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

function addTask(){
    const generateID = generateid();
    const titleTask = document.getElementById('title').value;
    const dateTask = document.getElementById('dateTask').value;
    const desTask = document.getElementById('desTask').value;
    
    const taskObject = generateTaskObject(generateID, titleTask,dateTask,desTask,false);

    task.push(taskObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateid(){
    return +new Date()
}

function generateTaskObject(id, title, dateTask, desTask, isComplete){
    return{
        id,
        title,
        dateTask,
        desTask,
        isComplete
    }
}

document.addEventListener(RENDER_EVENT, function(){
    const uncomplitedTaskList = document.getElementById('incompleted');
    uncomplitedTaskList.innerText = '';

    const complitedTaskList = document.getElementById('completed');
    complitedTaskList.innerText = '';

    for (const taskItem of task)    {
        const taskElement = makeTask(taskItem);
        if (!taskItem.isComplete)
            uncomplitedTaskList.append(taskElement)
        else
            complitedTaskList.append(taskElement)
    }
});

function makeTask(taskObject){
    const textTitle = document.createElement('h2')
    textTitle.innerText = taskObject.title;

    const textDate = document.createElement('h5')
    textDate.innerText = taskObject.dateTask;

    const textDes = document.createElement('h4')
    textDes.innerText = taskObject.desTask;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle,textDes,textDate);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer)
    container.setAttribute('id', `id`, `book-${taskObject}`);

    if(taskObject.isComplete){
        const undoButon = document.createElement('button');
        const undoButonLog = document.createElement('i');
        undoButon.classList.add('undo-button');
        undoButonLog.classList.add('bi-recycle');

        undoButon.append(undoButonLog);

        undoButon.addEventListener('click', function(){
            undoTaskFromCompleted(taskObject.id);
        });

        const trashButon = document.createElement('button');
        const trashButonLog = document.createElement('i');
        trashButon.classList.add('trash-button');
        trashButonLog.classList.add('bi-trash');

        trashButon.append(trashButonLog);

        trashButon.addEventListener('click', function(){
            removeTaskFromCompleted(taskObject.id);
        })

        container.append(undoButon, trashButon);
    } else{
        const checkButon = document.createElement('button');
        const checkButonLog = document.createElement('i');
        checkButon.classList.add('check-button');
        checkButonLog.classList.add('bi-check2-circle');

        checkButon.append(checkButonLog);

        checkButon.addEventListener('click', function(){
            addTaskFromCompleted(taskObject.id);
        })

        const trashButon = document.createElement('button');
        const trashButonLog = document.createElement('i');
        trashButon.classList.add('trash-button');
        trashButonLog.classList.add('bi-trash');

        trashButon.append(trashButonLog);

        trashButon.addEventListener('click', function(){
            removeTaskFromCompleted(taskObject.id);
        })

        container.append(checkButon);
        container.append(trashButon);
    }
    return container;
};

function addTaskFromCompleted(taskId){
    const taskTarget = findTask(taskId);

    if(taskTarget == null) return;

    taskTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findTask(taskid){
    for (const taskItem of task) {
        if(taskItem.id === taskid){
            return taskItem
        }
    }
    return null;
}

function removeTaskFromCompleted(taskId){
    const taskTarget = findTaskIndex(taskId);

    if(taskTarget === -1) return;

    task.splice(taskTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoTaskFromCompleted(taskId){
    const taskTarget = findTask(taskId);

    if(taskTarget == null) return;

    taskTarget.isComplete = false
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findTaskIndex(taskId){
    for (const index in task){
        if(task[index].id === taskId)
        return index;
    }
    return -1;
}

function saveData(){
    if(isStorageExist()){
        const parsed = JSON.stringify(task);
        localStorage.setItem(STORAGE_KEY, parsed)
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

const SAVED_EVENT = 'saved-task';
const STORAGE_KEY = 'TASK_SWIFT';

function isStorageExist(){
    if((typeof(Storage) === undefined)){
        alert('browse;r jadul')
        return false;
    }
    return true;
}

function loadDataFromStorage(){
    const serialiazedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serialiazedData);

    if(data !== null){
        for (const tasks of data){
            task.push(tasks);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
};

function reset(){
    const titleTask = document.getElementById('title');
    const dateTask = document.getElementById('dateTask');
    const desTask = document.getElementById('desTask');

    titleTask.value = '';
    dateTask.value = '';
    desTask.value = '';
}

function limitText(element, maxLength){
    if (element.value.length > maxLength){
        element.value = element.value.slice(0, maxLength);   
    }
}
