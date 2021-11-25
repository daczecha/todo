import { sideBar } from "./components/sideBar";
import { main } from "./components/main";
import { projects } from "./data/projects";
require('./css/index.css');

sideBar();
main(projects[0]);