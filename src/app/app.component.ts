import {Component, OnInit} from "@angular/core";
import {TimerComponent} from "./app.timer.component";
import {taskService} from "./task.service";
import {configService} from "./config.service";
import {projectService} from "./project.service";

@Component({
    selector: "app",
    template: "<timer></timer>",
    providers: [taskService, configService, projectService]
})
export class AppComponent {

}