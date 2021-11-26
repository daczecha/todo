import { $app } from '../app';
import { projectArray } from '../data/projects';
import { main } from "./main";


require('../css/sideBar.css');

export function sideBar(){
    const $sideBar = document.createElement('div');
    $sideBar.id = 'side_bar';

    //Create Project Buttons
    for(let i = 0; i < projectArray.length; i++){
        const $projectButton = document.createElement('div');
        $projectButton.id = `project_${i}`;
        $projectButton.classList.add('project-button');
        $projectButton.innerText = `${projectArray[i].name}`;

        $sideBar.appendChild($projectButton);
    }

    $app.appendChild($sideBar);



}