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
            console.log(id);
            event.target.parentNode.remove();
            currentList.forEach( task => {
                if (task.id == id.substring(1)) {
                    currentList.splice(currentList.indexOf(task), 1);
                    setLS(currentList);
                } 
            })
        });
    });
}

//function for handling completed button
// function completeTask (element) {
//     checkCompletes.forEach( checkComplete => {
//         checkComplete.parentElement.text-decoration-line = 'line-through';
//     })
// }

export {addEventDelete};