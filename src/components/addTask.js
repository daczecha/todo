import { $app } from '../app';
import { Task } from '../data/classes/Task';
import { taskArray } from '../data/tasks';
import { main } from './main';

require('../css/addTask.css');

export function addTask(project){
    //Create Blur Element
    const $blur = document.createElement('div');
    $blur.id = 'blur';

    //Create Modal Element
    const $addTask = document.createElement('div');
    $addTask.id = 'add_task';

    //Create Name Input
    const $taskName = document.createElement('input');
    $taskName.type = 'text';
    $taskName.placeholder = 'Name';
    
    //Create Description Input
    const $taskDescription = document.createElement('input');
    $taskDescription.type = 'text';
    $taskDescription.placeholder = 'Description';

    //Create Due Date Input
    const $taskDueDate = document.createElement('input');
    $taskDueDate.type = 'date';
    
    //Create Priority Input
    const $taskPriority = document.createElement('select');

    //Create Priority Options
    var $low = document.createElement('option');
    $low.value = 'low';
    $low.innerText = 'Low';

    var $medium = document.createElement('option');
    $medium.value = 'medium';
    $medium.innerText = 'Medium';
    
    
    var $high = document.createElement('option');
    $high.value = 'high';
    $high.innerText = 'High';


    //Create Add Task Button
    const $addTaskButton = document.createElement('button');
    $addTaskButton.innerText = 'Add Task';


    //Append Options to Priority Input
    $taskPriority.appendChild($low);
    $taskPriority.appendChild($medium);
    $taskPriority.appendChild($high);

    
    //Append Children To Modal
    $addTask.appendChild($taskName);
    $addTask.appendChild($taskDescription);
    $addTask.appendChild($taskDueDate);
    $addTask.appendChild($taskPriority);
    $addTask.appendChild($addTaskButton);


    //Append Modal To App
    $app.appendChild($blur);
    $app.appendChild($addTask);


    //Button Event
    $addTaskButton.addEventListener('click', function(){
        $app.removeChild($blur);
        $app.removeChild($addTask);
        taskArray.push(new Task(
            $taskName.value,
            $taskDescription.value,
            $taskPriority.value,
            $taskDueDate.value,
            project.name
        ));
        localStorage.setItem('taskArray', JSON.stringify(taskArray));
        $app.removeChild(document.getElementById('main'));
        main(project);
    })
}
