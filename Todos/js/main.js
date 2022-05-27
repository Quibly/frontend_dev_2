import Todos from './todos.js';
import {addEventFilter} from '../js/todos.js';
const todos = new Todos('tasks');

todos.displayList();
todos.addListenNewTask();
addEventFilter();
