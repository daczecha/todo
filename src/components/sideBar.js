import { $app } from '../app';
import { main } from './main';
import { projectArray } from '../data/projects';
import { completedTasks } from '../data/completed';
import { setProjectIndex } from '../projectIndex';
import { addProject } from './addProject';

import projectIcon from '../img/clipboard.png';
import completedIcon from '../img/task.png';



require('../css/sideBar.css');

export function sideBar()
{
    const $sideBar = document.createElement('div');
    $sideBar.id = 'side_bar';

    const $addProject = document.createElement('button');
    $addProject.innerText = '+ Add Project';
    $addProject.id = 'add_project_modal';


    const $completedIcon = document.createElement('img');
    $completedIcon.src = completedIcon;
    $completedIcon.style.width = '15px';

    const $completedTasks = document.createElement('div');
    $completedTasks.id = 'completed_tasks_container'    
    const $completedTasksInfo = document.createElement('div');
    
    $completedTasksInfo.id = 'completed_tasks';
    $completedTasksInfo.innerText = `Completed Tasks : ${completedTasks.length}`
    
    
    $completedTasks.appendChild($completedIcon);
    $completedTasks.appendChild($completedTasksInfo)
    
    const $workspace = document.createElement('h4');
    $workspace.innerText = 'Workspace';

    $sideBar.appendChild($completedTasks);
    $sideBar.appendChild($workspace);


    //Create Project Buttons
    for(let i = 1; i < projectArray.length; i++){
        const $projectContainer = document.createElement('div');
        $projectContainer.id = `project_${i}`;
        $projectContainer.classList.add('project-container')

        const $icon = document.createElement('img');
        $icon.src = projectIcon;
        $icon.style.width = '15px';
        $icon.style.margin = '0px 5px';

        const $projectButton = document.createElement('div');
        $projectButton.id = `project_button_${i}`;
        $projectButton.classList.add('project-button');
        $projectButton.innerText = `${projectArray[i].name} : ${projectArray[i].tasks.length}`;
        $projectButton.style.marginRight = 'auto';

        
        $projectContainer.appendChild($icon);
        $projectContainer.appendChild($projectButton);


        const $removeProjectBtutton = document.createElement('button');
        $removeProjectBtutton.id = `remove_project_button_${i}`;
        $removeProjectBtutton.classList.add('remove-project-button');
        $removeProjectBtutton.innerText = 'X';
        $projectContainer.appendChild($removeProjectBtutton);

        $sideBar.appendChild($projectContainer);
    }

    $sideBar.appendChild($addProject);
    $app.insertBefore($sideBar, document.getElementById('main'));
    addProjectButton();



    const $removeProjectButtonArray = document.querySelectorAll('.remove-project-button');

    for (const btn of $removeProjectButtonArray) {
        btn.addEventListener('click', function() {
            var regex = /[\d|1-9|\+]+/g;
            var matches = this.id.match(regex);
            var index = Number(matches[0]);
            if(index > 0){
                projectArray.splice(index, 1);
                localStorage.setItem('projectArray', JSON.stringify(projectArray));
                $sideBar.removeChild(document.getElementById(`project_${index}`));
                if(projectArray.length === 1){
                    main(projectArray[0]);
                }
                resetProjects();
            }
        });
    }

    const $projectButtonArray = document.querySelectorAll('.project-container');

    for (const btn of $projectButtonArray) {
        btn.addEventListener('click', function() {
            var regex = /[\d|0-9|\+]+/g;
            var matches = this.id.match(regex);
            var index = Number(matches[0]);
            $app.removeChild(document.getElementById('main'));
            setProjectIndex(index);
            if(projectArray.length === 1){
                $app.removeChild(document.getElementById('main'));
                main(projectArray[0]);
            }else{
                main(projectArray[index]);
            }
        });
    }

    $completedTasks.addEventListener('click', function(){
        $app.removeChild(document.getElementById('main'));
        main(projectArray[0]);
    });

}


function addProjectButton(){
    document.getElementById('add_project_modal').addEventListener('click', function(){
        addProject();
    });
}


function resetProjects(){
    const $removeProjectButtonArray = document.querySelectorAll('.remove-project-button');
    for (let i = 0; i < $removeProjectButtonArray.length; i++) {
        $removeProjectButtonArray[i].id = `remove_button_${i+1}`;
        $removeProjectButtonArray[i].parentNode.id = `project_${i+1}`;
    }
}   