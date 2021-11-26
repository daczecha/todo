import { Task } from "./classes/Task";

let taskArray = [

];

if(!localStorage.getItem('taskArray')){
    localStorage.setItem('taskArray', JSON.stringify(taskArray));
}else{
    taskArray =  JSON.parse(localStorage.getItem("taskArray"));
}

export  {taskArray as taskArray};