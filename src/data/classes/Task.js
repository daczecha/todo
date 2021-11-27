export class Task{
    constructor(name, description, priority, dueDate, project){
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.project = project;
    }
    completed = false;
    pastDue = false;
}