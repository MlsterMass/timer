export class Init {
    load(){
        if(localStorage.getItem('task') === null || localStorage.getItem('task') == undefined){
            var task = [];
            localStorage.setItem('task', JSON.stringify(task));
            return
        } 
    }
}