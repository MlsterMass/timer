export class projectName{
    loadProjects(){
        //console.log("Initial");
        var project_names = ['select project', 'timer', 'clock', 'etc'];
        localStorage.setItem('project_names', JSON.stringify(project_names));
        return
    }
}


