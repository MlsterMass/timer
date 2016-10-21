import { Injectable } from '@angular/core';
import { projectName } from './config';

@Injectable()
export class configService extends projectName{

    constructor() {
        super();
        this.loadProjects();
     }
    getProjects(){
        var projects = JSON.parse(localStorage.getItem('project_names'));
        return projects;
    }
}