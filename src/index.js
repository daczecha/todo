import { $app } from "./app";
import { main } from "./components/main";
import { sideBar } from "./components/sideBar";
import { projectArray } from "./data/projects";
import { taskArray } from "./data/tasks";
import { projectIndex, setProjectIndex } from './projectIndex';
require('./css/index.css');

sideBar();
main(projectArray[0]);

const $projectButtonArray = document.querySelectorAll('.project-button');

for (const btn of $projectButtonArray) {
    btn.addEventListener('click', function() {
        var regex = /[\d|0-9|\+]+/g;
        var matches = this.id.match(regex);
        var index = Number(matches[0]);
        $app.removeChild(document.getElementById('main'));
        setProjectIndex(index);
        main(projectArray[index]);
    });
}
