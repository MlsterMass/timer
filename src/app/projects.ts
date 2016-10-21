export class Projects{
    loadProjects(){
        //console.log("Initial");
        if(localStorage.getItem('selected_project') === null || 
        localStorage.getItem('selected_project') == undefined){
        var selected_project = [];
        localStorage.setItem('selected_project', JSON.stringify(selected_project));
        return
        }
    }
}


