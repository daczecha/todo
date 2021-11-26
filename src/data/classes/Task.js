export class Task{
    constructor(name, description, priority, dueDate, project, index){
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.project = project;
        this.index = index;
    }
    completed = false;
    pastDue = false;
}