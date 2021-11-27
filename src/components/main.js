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
    removeTask();
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

    const $tasksWrapper = document.createElement('div');
    $tasksWrapper.id = 'tasks_wrapper';


    $taskSection.appendChild($taskLabel);
    $taskSection.appendChild(addTaskButton(projectArray[projectIndex]));
    $taskSection.appendChild($tasksWrapper);


    createTasks(project, $tasksWrapper);

    return $taskSection;
}

function createTasks(project, section){
    for(let i = 0; i < taskArray.length; i++){
        if(taskArray[i].project === project.name){
            const $taskContainer = document.createElement('div');
            $taskContainer.classList.add('task-container', taskArray[i].priority);
            $taskContainer.id = `task_${i}`;


            const $completeTaskButton = document.createElement('button');
            $completeTaskButton.innerText = 'complete';
            $completeTaskButton.classList.add('complete-task-button');
            $completeTaskButton.id = `complete_button_${i}`;

            const $taskName = document.createElement('p');
            $taskName.classList.add('task-name');
            $taskName.innerText = taskArray[i].name;


            

            const $taskDueDate = document.createElement('p');
            $taskDueDate.classList.add('task-due-date');
            $taskDueDate.innerText = taskArray[i].dueDate;
            
            const $removeTaskButton = document.createElement('button');
            $removeTaskButton.innerText = 'Remove';
            $removeTaskButton.classList.add('remove-task-button');
            $removeTaskButton.id = `remove_button_${i}`;




            $taskContainer.appendChild($completeTaskButton);
            $taskContainer.appendChild($taskName);
            $taskContainer.appendChild($taskDueDate);
            $taskContainer.appendChild($removeTaskButton);

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

function removeTask(){
    const $removeTaskButtonArray = document.querySelectorAll('.remove-task-button');
    for (const btn of $removeTaskButtonArray) {
        btn.addEventListener('click', function() {
            var regex = /[\d|0-9|\+]+/g;
            var matches = this.id.match(regex);
            var index = Number(matches[0]);
            if(index > -1){
                taskArray.splice(index, 1);
                console.log(taskArray);
                localStorage.setItem('taskArray', JSON.stringify(taskArray));
                document.getElementById('tasks_wrapper').removeChild(document.getElementById(`task_${index}`));
                resetIds();
            }
        });
    }
}


function resetIds(index){
    const $removeTaskButtonArray = document.querySelectorAll('.remove-task-button');
    for (let i = 0; i <$removeTaskButtonArray.length; i++) {
        $removeTaskButtonArray[i].id = `remove_button_${i}`;
        $removeTaskButtonArray[i].parentNode.id = `task_${i}`;
        $removeTaskButtonArray[i].parentNode.firstChild.id = `complete_button_${i}`;
    }
}