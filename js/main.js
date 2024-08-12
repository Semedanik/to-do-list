const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList'); 

let tasks = [];

// Добавление задачи: без скобочек, чтобы сразу ее не запускать(только запуск после сабмита)
form.addEventListener('submit', addTask);

// Удаление задачи
tasksList.addEventListener('click', deleteTask)

// Выполнение задачи
tasksList.addEventListener('click', doneTask)

function addTask(event) {
    event.preventDefault();
    
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(), // мили-секунды от текущего времени
        text: taskText,
        done: false,
    };

    tasks.push(newTask)

// Формируем css класс 
    const cssClass = newTask.done ? 'task-title--done task-title' : 'task-title';
    
    const taskHTML = `<li id='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
    <span class=${cssClass}>${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
</li>`;

//beforeend ставит в конец элементы файла
tasksList.insertAdjacentHTML('beforeend', taskHTML);

// Очистка пустой строки 
taskInput.value = '';
taskInput.focus()

if(tasksList.children.length > 1){
    emptyList.classList.add('none');

   
}
}

function deleteTask(event){
    if (event.target.dataset.action !== 'delete') return; 

        const parenNode = event.target.closest('.list-group-item');

        const id = Number(parenNode.id);

        const index = tasks.findIndex((task) => task.id === id);


        tasks.splice(index, 1)


        parenNode.remove()

        // Проверка. 
        if(tasksList.children.length === 1){
            emptyList.classList.remove('none');
        }

    }

function doneTask(event){
    if (event.target.dataset.action !== 'done') return;
        const parenNode = event.target.closest('.list-group-item');
        const taskTitle = parenNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done')

    }

