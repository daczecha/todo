import { $app } from '../app';

require('../css/main.css');

export function main(project){
    updateDom(project)
}


function updateDom(project){
    const $main = document.createElement('div');
    $main.id = 'main';

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

    $main.append($container);
    
    $app.appendChild($main);
}