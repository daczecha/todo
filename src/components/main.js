import { $app } from '../app';
import { projectArray } from '../data/projects';
import { taskArray } from '../data/tasks';
import { projectIndex } from '../projectIndex';
import { addTask } from './addTask';
require('../css/main.css');


export function main(project){
    const $main = document.createElement('div');
    $main.id = 'main';

    $main.appendChild(infoSection(project));
    $main.appendChild(taskSection(project));

    $app.appendChild($main);
}

function infoSection(project){
    const $infoSection = document.createElement('div');
    $infoSection.id = 'info_section';

    const $projectName = document.createElement('h1');
    $projectName.id = 'project_name';
    $projectName.innerText = project.name;

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

    const $taskLabel = document.createElement('p');
    $taskLabel.id = 'task_label';
    $taskLabel.innerText = 'Tasks';

    $taskSection.appendChild($taskLabel);
    $taskSection.appendChild(addTaskButton(projectArray[projectIndex]));

    createTasks(project, $taskSection);

    return $taskSection;
}

function createTasks(project, section){
    for(let i = 0; i < taskArray.length; i++){
        if(taskArray[i].project === project.name){
            const $taskContainer = document.createElement('div');
            $taskContainer.classList.add('task-container');
            $taskContainer.id = `task_${taskArray[i].index}`;

            const $taskName = document.createElement('p');
            $taskName.classList.add('task-name');
            $taskName.innerText = taskArray[i].name; 

            $taskContainer.appendChild($taskName);
            section.appendChild($taskContainer);
        }else{

        }
    }
}

function addTaskButton(project){
    const $addTaskButton = document.createElement('button');
    $addTaskButton.innerText = 'Add Task';

    $addTaskButton.addEventListener('click', function(){
        addTask(project);
    });

    return $addTaskButton;
}

function deleteTask(){
    const $taskContainerArray = document.querySelectorAll('.task-container');
    for (const btn of $taskContainerArray) {
        btn.addEventListener('click', function() {
            var index = Number(this.id.slice(-1));
            if (index > -1) {
                document.getElementById('task_section').removeChild(document.getElementById(`task_${index}`));
                taskArray.splice(index-1, 1);
                localStorage.setItem('taskArray', JSON.stringify(taskArray));
            }
        });
    }
}