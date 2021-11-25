export class Task{
    constructor(name, description,priority, dueDate){
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }
    nextUp = true;
    doing = false;
    completed = false;
    pastDue = false;
}