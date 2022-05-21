// functions for saving and retrieving data from local storage

// function for saving current Todo list to local storage
function setLS (todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// function for getting current Todo list from local storage
function getLS () {
    let todoList;
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.getItem('todoList'));
    } else {
        todoList = [];
    }
    return todoList;
}

export { setLS, getLS };
