import { setLS, getLS } from "./ls.js";
//File for housing functions that handle tasks like deleting and completing tasks

//function for adding eventlisteners to buttons
function addEventDelete () {
    // const currentList = getLS();
    const deletebuttons = Array.from(document.querySelectorAll('.taskBtn'));
    deletebuttons.forEach( btn => {
        btn.addEventListener('click', (event) => {
            const currentList = getLS();
            const id= event.currentTarget.parentNode.firstChild.nextSibling.id;
            event.target.parentNode.remove();
            currentList.forEach( task => {
                if (task.id == id.substring(1)) {
                    currentList.splice(currentList.indexOf(task), 1);
                    setLS(currentList);
                } 
            });
            tasksRemaining();
        });
    });
}

function addEventComplete () {
    const completeButtons  = Array.from(document.querySelectorAll('.taskInput'));
    completeButtons.forEach( btn => {
        btn.addEventListener('click', (event) => {
            const id  = event.currentTarget.id;
            const currentList = getLS();
            const value = (event.currentTarget.checked);
            currentList.forEach( task => {
                if (task.id == id.substring(1)) {
                    task.completed = event.currentTarget.checked;
                    setLS(currentList);
                }
            });
            tasksRemaining();
        });     
    });
}

function tasksRemaining () {
    let amount = 0;
    const remaining = document.querySelector('#remaining');
    const currentList = getLS();
    currentList.forEach( task => {
        if (task.completed == false) {
            ++amount
        }
    });
    remaining.textContent = `${amount} tasks left`;
    setLS(currentList);
    return amount;
}

//function for handling completed button
// function completeTask (element) {
//     checkCompletes.forEach( checkComplete => {
//         checkComplete.parentElement.text-decoration-line = 'line-through';
//     })
// }

export {addEventDelete, addEventComplete, tasksRemaining};