let completedTasks = [

];

if(!localStorage.getItem('completedTasks')){
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}else{
    completedTasks =  JSON.parse(localStorage.getItem("completedTasks"));
}

export {completedTasks as completedTasks};