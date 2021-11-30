import { $app } from '../app';
import { Task } from '../data/classes/Task';
import { completedTasks } from '../data/completed';
import { projectArray } from '../data/projects';
import { projectIndex } from '../projectIndex';
import { addTask } from './addTask';
import { sideBar } from './sideBar';
require('../css/main.css');


import tick from '../img/check.png';

export function main(project){
    const $main = document.createElement('div');
    $main.id = 'main';

    $main.appendChild(infoSection(project));
    $main.appendChild(taskSection(project));

    $app.appendChild($main);
    removeTask(project);
    removeCompletedTask(project);
    completeTask(project);
}

function infoSection(project){
    const $infoSection = document.createElement('div');
    $infoSection.id = 'info_section';

    const $projectName = document.createElement('h1');
    $projectName.id = 'project_name';
    if(project.name !== 'Completed Tasks'){
        $projectName.innerText = `${project.name} : ${project.tasks.length}`;
    }else{
        $projectName.innerText = `${project.name} : ${completedTasks.length}`;
    }

    const $projectDescription = document.createElement('p');
    $projectDescription.id = 'project_description';
    $projectDescription.innerText = project.description;

    $infoSection.appendChild($projectName);
    $infoSection.appendChild($projectDescription);

    return $infoSection;
}

function taskSection(project){
    const $taskSection = document.createElement('div');
    $taskSection.id = 'task_section';
    
    if(project.name !== 'Completed Tasks'){
        $taskSection.appendChild(addTaskButton(projectArray[projectIndex]));
    }else{
        
    }
    const $tasksWrapper = document.createElement('div');
    $tasksWrapper.id = 'tasks_wrapper';
    $taskSection.appendChild($tasksWrapper);


    createTasks(project, $tasksWrapper);

    if(project.name === 'Completed Tasks'){
        showCompletedTasks($tasksWrapper);
    }

    return $taskSection;
}

function createTasks(project, section){
    for(let i = project.tasks.length-1; i >= 0; i--){
            const $taskContainer = document.createElement('div');
            $taskContainer.classList.add('task-container', project.tasks[i].priority);
            $taskContainer.id = `task_${i}`;


            const $tick = document.createElement('img');
            $tick.src = tick;
            $tick.style.width = '15px';

            const $completeTaskButton = document.createElement('button');
            $completeTaskButton.classList.add('complete-task-button');
            $completeTaskButton.id = `complete_button_${i}`;

            $completeTaskButton.appendChild($tick);


            const $taskName = document.createElement('p');
            $taskName.classList.add('task-name');
            $taskName.innerText = project.tasks[i].name;


            const $taskDescription = document.createElement('p');
            $taskDescription.classList.add('task-description');
            $taskDescription.innerText = project.tasks[i].description;

            const $taskDueDate = document.createElement('p');
            $taskDueDate.classList.add('task-due-date');
            $taskDueDate.innerText = project.tasks[i].dueDate;
            
            const $removeTaskButton = document.createElement('button');
            $removeTaskButton.innerText = 'X';
            $removeTaskButton.classList.add('remove-task-button');
            $removeTaskButton.id = `remove_button_${i}`;




            $taskContainer.appendChild($completeTaskButton);
            $taskContainer.appendChild($taskName);
            $taskContainer.appendChild($taskDescription);
            $taskContainer.appendChild($taskDueDate);
            $taskContainer.appendChild($removeTaskButton);

            section.appendChild($taskContainer);
    }
}

function showCompletedTasks(section){
    for(let i = completedTasks.length-1; i >= 0; i--){
        const $taskContainer = document.createElement('div');
        $taskContainer.classList.add('task-container', completedTasks[i].priority);
        $taskContainer.id = `task_${i}`;

        const $taskName = document.createElement('p');
        $taskName.classList.add('task-name');
        $taskName.innerText = completedTasks[i].name;

        const $taskDescription = document.createElement('p');
        $taskDescription.classList.add('task-description');
        $taskDescription.innerText = completedTasks[i].description;

        const $taskDueDate = document.createElement('p');
        $taskDueDate.classList.add('task-due-date');
        $taskDueDate.innerText = completedTasks[i].dueDate;
   
        const $removeTaskButton = document.createElement('button');
        $removeTaskButton.innerText = 'X';
        $removeTaskButton.classList.add('remove-completed-task-button');
        $removeTaskButton.id = `remove_completed_button_${i}`;

        $taskContainer.appendChild($taskName);
        $taskContainer.appendChild($taskDescription);
        $taskContainer.appendChild($taskDueDate);
        $taskContainer.appendChild($removeTaskButton);

        section.appendChild($taskContainer);
    }
}

function addTaskButton(project){
    const $addTaskButton = document.createElement('button');
    $addTaskButton.innerText = '+ Add Task';
    $addTaskButton.id = 'add_task_button';

    $addTaskButton.addEventListener('click', function(){
        addTask(project);
        document.body.style.overflow = 'hidden';
    });

    return $addTaskButton;
}


function removeCompletedTask(){
    const $removeCompletedTaskButtonArray = document.querySelectorAll('.remove-completed-task-button');
    for (const btn of $removeCompletedTaskButtonArray) {
        btn.addEventListener('click', function() {
            var regex = /[\d|0-9|\+]+/g;
            var matches = this.id.match(regex);
            var index = Number(matches[0]);
            if(index > -1){
                completedTasks.splice(index, 1);
                localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
                document.getElementById('tasks_wrapper').removeChild(document.getElementById(`task_${index}`));
                resetCompletedIds();
            }
            $app.removeChild(document.getElementById('side_bar'));
            document.getElementById('project_name').innerText = `Completed Tasks : ${completedTasks.length}`;
            sideBar();
        });
    }
}

function removeTask(project){
    const $removeTaskButtonArray = document.querySelectorAll('.remove-task-button');
    for (const btn of $removeTaskButtonArray) {
        btn.addEventListener('click', function() {
            var regex = /[\d|0-9|\+]+/g;
            var matches = this.id.match(regex);
            var index = Number(matches[0]);
            if(index > -1){
                project.tasks.splice(index, 1);
                localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
                localStorage.setItem('projectArray', JSON.stringify(projectArray));
                document.getElementById('tasks_wrapper').removeChild(document.getElementById(`task_${index}`));
                resetIds();

            }
            $app.removeChild(document.getElementById('side_bar'));
            document.getElementById('project_name').innerText = `${project.name} : ${project.tasks.length}`;
            sideBar();

        });
    }

}


function resetIds(){
    const $removeTaskButtonArray = document.querySelectorAll('.remove-task-button');
    for (let i = 0; i <$removeTaskButtonArray.length; i++) {
        $removeTaskButtonArray[i].id = `remove_button_${i}`;
        $removeTaskButtonArray[i].parentNode.id = `task_${i}`;
        $removeTaskButtonArray[i].parentNode.firstChild.id = `complete_button_${i}`;
    }
}


function resetCompletedIds(){
    const $removeTaskButtonArray = document.querySelectorAll('.remove-task-button');
    for (let i = 0; i <$removeTaskButtonArray.length; i++) {
        $removeTaskButtonArray[i].id = `remove_completed_button_${i}`;
        $removeTaskButtonArray[i].parentNode.id = `task_${i}`;
    }
}




function completeTask(project){
    const $completeTaskButtonArray = document.querySelectorAll('.complete-task-button');
    for (const btn of $completeTaskButtonArray) {
        btn.addEventListener('click', function() {
            var regex = /[\d|0-9|\+]+/g;
            var matches = this.id.match(regex);
            var index = Number(matches[0]);
            if(index > -1){
                completedTasks.push(new Task(
                    project.tasks[index].name,
                    project.tasks[index].description,
                    project.tasks[index].priority,
                    project.tasks[index].dueDate
                    ))
                project.tasks.splice(index, 1);
                localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
                localStorage.setItem('projectArray', JSON.stringify(projectArray));
                document.getElementById('tasks_wrapper').removeChild(document.getElementById(`task_${index}`));
                resetIds();
            }
            $app.removeChild(document.getElementById('side_bar'));
            document.getElementById('project_name').innerText = `${project.name} : ${project.tasks.length}`;
            sideBar();
        });
    }
}