import { Injectable } from '@angular/core';
import { Projects } from './projects';

@Injectable()
export class projectService extends Projects {

    constructor() {
        super();
        this.loadProjects();
    }
    getProjects() {
        var projects = JSON.parse(localStorage.getItem('selected_project'));
        return projects;
    }
    addProjects(newProject) {
        var selected_project = [];
         selected_project = JSON.parse(localStorage.getItem('selected_project'));
        //Add new Project
        selected_project.push(newProject);
        // Set new Project
        localStorage.setItem('selected_project', JSON.stringify(selected_project));
        
    }
}