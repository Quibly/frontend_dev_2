import { setLS, getLS } from './ls.js';
import { addEventComplete, addEventDelete, tasksRemaining } from './utilities.js';
//For displaying and refreshing the Todo list

export default class Todos {
    constructor(elementID) {
        this.pElem = document.getElementById(elementID);
        this.todoList = getLS();
        this.remaining = tasksRemaining();
    }

    //method for displaying Todo list
    displayList () {
        const currentList = getLS();
        currentList.forEach( task => {
            let card = renderTaskItem(task);
            this.pElem.appendChild(card);
            addEventDelete();
            addEventComplete();
            tasksRemaining();
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
        // filterButtons.forEach( btn => {
        //     btn.addEventListener('click', (event) => {
        //         this.displayList;
        //     })
        // })

    //method for adding new task to to Todo list
    addNewTask (event) {
        const currentList = getLS();
        const input = document.querySelector('#new').value;
        console.log(input);
        const timestamp = new Date().getTime();
        const completed = new Boolean(false);
        console.log(completed);
        const todo = {"id": timestamp, "content": input, "completed": completed};
        currentList.push(todo);
        setLS(currentList);
        document.querySelector('#tasks').appendChild(renderTaskItem(todo));
        document.querySelector('#new').value = '';
        addEventDelete();
        addEventComplete();
        tasksRemaining();
    }
    //function for removing task from Todo list

}

//function for displaying Todo list
function renderTaskItem (task) {
    const card = document.createElement('div');
    let checked;
    let filter = document.querySelector('input[name="filter"]:checked').value;
    const check = task.completed.value;
    if (check) {
        checked = 'checked';
    } else if (!check) {
        checked = '';
    }
    card.setAttribute('class', 'task');
    if (filter == 'all') {
        card.setAttribute('style', 'display: grid');
    } else if (checked == '' && filter !== 'active') {
        card.setAttribute('style', 'display: none');
    } else if (checked == 'checked' && filter !== 'completed') {
        card.setAttribute('style', 'display: none');
    };
    card.innerHTML = `
        <input type='checkbox' class='taskInput' id='a${task.id}' ${checked}>
        <label class='taskLabel' style='white-space: pre' for='a${task.id}'>${task.content.trim()}</label>
        <button type='button' class='taskBtn'>X</button>
        
    `;
    return card;
}

//method for adding eventlistener for filter buttons
export function addEventFilter () {
    const filterButtons = Array.from(document.querySelectorAll('input[type="radio"]'));
    filterButtons.forEach( btn => {
        btn.addEventListener('click', () => {
            const currentList = getLS();
            document.querySelector('#tasks').innerHTML = '';
            currentList.forEach( task => {
                let card = renderTaskItem(task);
                document.querySelector('#tasks').appendChild(card);
                addEventDelete();
                addEventComplete();
                tasksRemaining();
            });
        });
    });
}