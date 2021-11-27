import { projectArray } from "../data/projects";
import { $app } from '../app';
import { sideBar } from "./sideBar";
import { Project } from "../data/classes/Project";
require ('../css/addProject.css');

export function addProject(){
    const $blur = document.createElement('div');
    $blur.id = 'blur';

    //Create Modal Element
    const $addProject = document.createElement('div');
    $addProject.id = 'add_project';

    document.getElementById('add_project_modal').disabled = true;
    //Create Name Input
    const $projectName = document.createElement('input');
    $projectName.type = 'text';
    $projectName.placeholder = 'Name';

    //Create Description Input
    const $projectDescription = document.createElement('input');
    $projectDescription.type = 'text';
    $projectDescription.placeholder = 'Description';

    const $addProjectButton = document.createElement('button');
    $addProjectButton.innerText = 'Add Project';

    const $error = document.createElement('p');
    $error.innerText = 'Please Fill All Felds';
    $error.style.color = 'red';
    $error.style.textAlign = 'center';

    //Append Children To Modal
    $addProject.appendChild($projectName);
    $addProject.appendChild($projectDescription);
    $addProject.appendChild($addProjectButton);


    //Append Modal To App
    $app.appendChild($blur);
    $app.appendChild($addProject);


    //Button Event
    $addProjectButton.addEventListener('click', function(){
        if($projectName.value !== '' && $projectDescription.value !== ''){
            $app.removeChild($blur);
            $app.removeChild($addProject);
            projectArray.push(new Project(
                $projectName.value,
                $projectDescription.value,
            ));
            localStorage.setItem('projectArray', JSON.stringify(projectArray));
            $app.removeChild(document.getElementById('side_bar'));
            sideBar();
        }else{
            $addProject.appendChild($error);
        }
    });
}
