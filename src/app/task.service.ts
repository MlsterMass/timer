import { Injectable } from '@angular/core';
import { Init } from './init.task.name';
@Injectable()
export class taskService extends Init{

    constructor() { 
        //console.log("Service Init");
        super();
        this.load();
    }
    getTask(){
        var task = JSON.parse(localStorage.getItem('task'));
        return task;
    }
   addTask(newTask){
        var task = JSON.parse(localStorage.getItem('task'));
        //Add New task
        task.push(newTask);
        // Set New task
        localStorage.setItem('task', JSON.stringify(task));
    }
}