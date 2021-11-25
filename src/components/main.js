import { $app } from '../app';
import { Task } from '../data/classes/Task';
import { projects } from '../data/projects';

require('../css/main.css');

export function main(project){
    updateDom(project)
}


function updateDom(project){
    const $main = document.createElement('div');
    $main.id = 'main';

    const $container = document.createElement('div');
    $container.id = 'container';



    $main.append(createInfo(project));
    $main.append(createTasks(project));
    
    $app.appendChild($main);
    
}


function createInfo(project){
    const $container = document.createElement('div');
    $container.id = 'container';
    
    const $title = document.createElement('h1');
    $title.innerText = project.name;

    const $description = document.createElement('p');
    $description.innerText = project.description;

    const $subtitle = document.createElement('p');
    $subtitle.innerText = 'Tasks';


    $container.appendChild($title);
    $container.appendChild($description);
    $container.appendChild($subtitle);

    return $container;
}


function createTasks(project){
    const $tasks = document.createElement('div');
    $tasks.id = 'tasks';


    //Next Up
    const $nextUp = document.createElement('div');
    $nextUp.classList.add('task-container');

    const $nextUpInfo = document.createElement('div');
    $nextUpInfo.classList.add('task-info');

    const $nextUpTitle = document.createElement('p');
    $nextUpTitle.id = 'nextUpTitle';
    $nextUpTitle.innerText = 'Next Up';

    const $nextUpCount = document.createElement('p');
    $nextUpCount.id = 'nextUpCount';
    $nextUpCount.innerText = `${countTasks(project,'nu')}`;

    $nextUpInfo.appendChild($nextUpTitle);
    $nextUpInfo.appendChild($nextUpCount);

    $nextUp.appendChild($nextUpInfo);


    //In Progress
    const $progress = document.createElement('div');
    $progress.classList.add('task-container');


    const $progressInfo = document.createElement('div');
    $progressInfo.classList.add('task-info');

    const $progressTitle = document.createElement('p');
    $progressTitle.id = 'progressTitle';
    $progressTitle.innerText = 'In Progress';

    const $progressCount = document.createElement('p');
    $progressCount.id = 'progressCount';
    $progressCount.innerText = `${countTasks(project,'ip')}`;

    $progressInfo.appendChild($progressTitle);
    $progressInfo.appendChild($progressCount);

    $progress.appendChild($progressInfo);


    //Completed
    const $completed = document.createElement('div');
    $completed.classList.add('task-container');

    const $completedInfo = document.createElement('div');
    $completedInfo.classList.add('task-info');

    const $completedTitle = document.createElement('p');
    $completedTitle.id = 'completedTitle';
    $completedTitle.innerText = 'Completed';

    const $completedCount = document.createElement('p');
    $completedCount.id = 'progressCount';
    $completedCount.innerText = `${countTasks(project,'c')}`;

    $completedInfo.appendChild($completedTitle);
    $completedInfo.appendChild($completedCount);

    $completed.appendChild($completedInfo);


    //Past Due
    const $pastDue = document.createElement('div');
    $pastDue.classList.add('task-container');


    const $pastDueInfo = document.createElement('div');
    $pastDueInfo.classList.add('task-info');

    const $pastDueTitle = document.createElement('p');
    $pastDueTitle.id = 'pastDueTitle';
    $pastDueTitle.innerText = 'Past Due';

    const $pastDueCount = document.createElement('p');
    $pastDueCount.id = 'progressCount';
    $pastDueCount.innerText = `${countTasks(project,'pd')}`;

    $pastDueInfo.appendChild($pastDueTitle);
    $pastDueInfo.appendChild($pastDueCount);

    $pastDue.appendChild($pastDueInfo);


    $tasks.appendChild($nextUp);
    $tasks.appendChild($progress);
    $tasks.appendChild($completed);
    $tasks.appendChild($pastDue);

    return($tasks)
}


function countTasks(project, str){
    let nu_count = 0;
    let ip_count = 0;
    let c_count = 0;
    let pd_count = 0;

    for(let i = 0; i< project.tasks.length; i++){
        if(project.tasks[i].nextUp === true){
            nu_count++;
        }
        if(project.tasks[i].doing === true){
            ip_count++;
        }
        if(project.tasks[i].canceled === true){
            c_count++;
        }
        if(project.tasks[i].pastDue === true){
            pd_count++;
        }
    }

    if(str === 'nu'){
        return nu_count;
    }else if(str === 'ip'){ 
        return ip_count;
    }else if(str === 'c'){
        return c_count;
    }else if(str === 'pd'){
        return pd_count;
    }else{

    }
}

function addTask(project){
    project.tasks.push(new Task('1','1','1','1'));
}