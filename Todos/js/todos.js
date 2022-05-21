import { setLS, getLS } from './ls.js';
import { addEventDelete } from './utilities.js';
//For displaying and refreshing the Todo list

export default class Todos {
    constructor(elementID) {
        this.pElem = document.getElementById(elementID);
        this.todoList = getLS();
    }

    //method for displaying Todo list
    displayList () {
        const currentList = getLS();
        currentList.forEach( task => {
            let card = renderTaskItem(task);
            this.pElem.appendChild(card);
            addEventDelete();
        });
    }

    //function for getting entire Todo list

    //function for getting active tasks

    //function for getting completed tasks
    
    //function for getting number of tasks left to do

    //method for adding eventlistener to new task input
    addListenNewTask () {
        const btn = document.querySelector('#newBtn');
        btn.addEventListener('click', this.addNewTask);
    }

    //function for adding new task to to Todo list
    addNewTask (event) {
        const currentList = getLS();
        const input = document.querySelector('#new').value;
        const timestamp = new Date().getTime();
        const completed = new Boolean(false);
        const todo = {"id": timestamp, "content": input, "completed": completed};
        currentList.push(todo);
        document.querySelector('#tasks').appendChild(renderTaskItem(todo));
        setLS(currentList);
        addEventDelete();
        document.querySelector('#new').value = '';
    }
    //function for removing task from Todo list

}

//function for displaying Todo list
function renderTaskItem (task) {
    const card = document.createElement('div');
    let checked;
    const check = Boolean(card.completed);
    if (check) {
        checked = 'checked';
    } else if (!check) {
        checked = '';
    }
    card.setAttribute('class', 'task');
    card.innerHTML = `
        <input type='checkbox' class='taskInput' id='a${task.id}' ${checked}>
        <label class='taskLabel' for='a${task.id}'>${task.content.replace(/['" ]+/g, '').trim()}</label>
        <button type='button' class='taskBtn'>X</button>
        
    `;
    return card;
}
