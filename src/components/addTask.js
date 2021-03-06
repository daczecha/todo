import { $app } from '../app';
import { Task } from '../data/classes/Task';
import { projectArray } from '../data/projects';
import { main } from './main';
import { sideBar } from './sideBar';

require('../css/addTask.css');

export function addTask(project){
    //Create Blur Element
    const $blur = document.createElement('div');
    $blur.id = 'blur';

    //Create Modal Element
    const $addTask = document.createElement('div');
    $addTask.id = 'add_task';

    document.getElementById('add_task_button').disabled = true;


    const $close = document.createElement('button');
    $close.innerText = 'X';

    //Create Name Input
    const $taskName = document.createElement('input');
    $taskName.type = 'text';
    $taskName.placeholder = 'Name';
    
    //Create Description Input
    const $taskDescription = document.createElement('input');
    $taskDescription.type = 'text';
    $taskDescription.placeholder = 'Description';

    //Create Due Date Input
    
    const $label = document.createElement('p');
    $label.innerText = 'Enter Date';

    const $taskDueDate = document.createElement('input');
    $taskDueDate.type = 'date';
    
    //Create Priority Input
    const $taskPriority = document.createElement('select');

    //Create Priority Options
    var $low = document.createElement('option');
    $low.value = 'low';
    $low.innerText = 'Not Important';

    var $medium = document.createElement('option');
    $medium.value = 'medium';
    $medium.innerText = 'Important';
    
    
    var $high = document.createElement('option');
    $high.value = 'high';
    $high.innerText = 'Very Important';


    //Create Add Task Button
    const $addTaskButton = document.createElement('button');
    $addTaskButton.innerText = 'Add Task';


    const $error = document.createElement('p');
    $error.innerText = 'Please Fill All Felds';
    $error.style.color = 'red';
    $error.style.textAlign = 'center';

    //Append Options to Priority Input
    $taskPriority.appendChild($low);
    $taskPriority.appendChild($medium);
    $taskPriority.appendChild($high);

    
    //Append Children To Modal
    $addTask.appendChild($close);
    $addTask.appendChild($taskName);
    $addTask.appendChild($taskDescription);
    $addTask.appendChild($label);
    $addTask.appendChild($taskDueDate);
    $addTask.appendChild($taskPriority);
    $addTask.appendChild($addTaskButton);


    //Append Modal To App
    $app.appendChild($blur);
    $app.appendChild($addTask);


    //Button Event


    $close.addEventListener('click', function(){
        $app.removeChild($blur);
        $app.removeChild($addTask);
        document.getElementById('add_task_button').disabled = false;
        document.body.style.overflow = 'auto';
    })

    $addTaskButton.addEventListener('click', function(){
        if(
            $taskName.value !== '' &&
            $taskDescription.value !== '' &&
            $taskPriority.value !== '' &&
            $taskDueDate.value !== ''
            ){
                $app.removeChild($blur);
                $app.removeChild($addTask);
                project.tasks.push(new Task(
                    $taskName.value,
                    $taskDescription.value,
                    $taskPriority.value,
                    $taskDueDate.value
                ));
                localStorage.setItem('projectArray', JSON.stringify(projectArray));
                $app.removeChild(document.getElementById('main'));
                $app.removeChild(document.getElementById('side_bar'));
                sideBar();
                main(project);
                document.body.style.overflow = 'auto';

            }else{
            $addTask.insertBefore($error,$addTaskButton);
        }
        
    });
}