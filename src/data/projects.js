import { Project } from "./classes/Project";

let projectArray = [
    new Project('Completed Tasks','Here are listed tasks you already completed')
];

if(!localStorage.getItem('projectArray')){
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
}else{
    projectArray =  JSON.parse(localStorage.getItem("projectArray"));
}

export {projectArray as projectArray}