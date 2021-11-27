import { $app } from "./app";
import { main } from "./components/main";
import { sideBar } from "./components/sideBar";
import { Project } from "./data/classes/Project";
import { projectArray } from "./data/projects";
require('./css/index.css');

sideBar();
main(projectArray[0]);



