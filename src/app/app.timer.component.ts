import { Component, OnInit } from "@angular/core";
import { Pipe, PipeTransform } from '@angular/core';
import { taskService } from './task.service';
import { configService } from './config.service';
import { projectService } from './project.service';
import { Init } from './init.task.name';
import { projectName } from './config';
import { transformDate } from './transform.date.pipe';
import { Observable } from 'rxjs/Rx';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: "timer",
    templateUrl: "./app/app.html",
    styles: [`
        .slct {
            height: 38px;
            text-align: center;
        }
        .timer_look {
            background-color: #fff;
            
        }
        .btn {
            width: 100px;
        }
        .selected_project{
            text-align: center;
            padding-bottom: 20px;
        }
        .of-on {
            padding-bottom: 20px;
            font-weight: bold;
            cursor: pointer;
        }
        .of-off {
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-bottom: 20px;
            font-weight: bold;
        }
        .project_color {
            color: blue;
            font-weight: bold;
        }
        .fa {
            cursor: pointer;
        }
        .hidden {
            display: none;
        }
    `],
    providers: [taskService, configService, projectService],

})

export class TimerComponent implements OnInit {
    
    task;
    text;
    project_names;
    name;
    selected_project;
    ticks:number = 0;
    now:any = new Date();
    timeUnit = "Sec";
    btnValue = "Start";
    btnStatus = true;
    timer;
    count;
    startRange;
    sR;
    endRange;
    eR;
    hStart;
    mStart;
    sStart;
    hEnd;
    mEnd;
    sEnd;
    spentTime = [];
    h;
    m;
    s;
    timeRange = [];
    constructor(private _timerService: taskService,
        private _configService: configService,
        private _projectService: projectService) {
    
         }
 
    ngOnInit() {

        this.project_names = this._configService.getProjects();
        this.task = this._timerService.getTask();
        this.selected_project = this._projectService.getProjects();
                      
    }    

    isVisible = false;
    is_Visible(id, index) {
        parseInt(index);
        if (id == index) {
            this.isVisible = true;
            //console.log(id, index);
        }

    }
    is_Hidden(i) {
        this.isVisible = false;

    }
    play() {
       function playstartTimer(){
           this.btnValue = "Stop";
           this.btnStatus = false;
           this.startRange = checkTime(new Date().getHours()) + ':' + checkTime(new Date().getMinutes());

           function checkTime(i) {
               return (i < 10) ? "0" + i : i;
           }

           this.sR = new Date();
           this.hStart = checkTime(this.sR.getHours());
           this.mStart = checkTime(this.sR.getMinutes());
           this.sStart = checkTime(this.sR.getSeconds());

           this.timer = setInterval(() => {
               this.ticks++;
               if (this.ticks === 60) {
                   this.timeUnit = "min";
                   this.ticks = Math.floor(this.ticks / 60);
               }
               else if (this.ticks === 60) {

                   this.timeUnit = "h" + "min";
               }
           }, 100);
        }
        function playstopTimer(){
            
        }
              
    }
    
    startTimer(t){
        this.btnValue = "Stop";
        this.btnStatus = false;
        this.startRange = checkTime(new Date().getHours()) + ':' + checkTime(new Date().getMinutes());
        
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }
      
        this.sR = new Date();
        this.hStart = checkTime(this.sR.getHours());
        this.mStart = checkTime(this.sR.getMinutes());
        this.sStart = checkTime(this.sR.getSeconds());
    
        this.timer = setInterval(() => {
            this.ticks++;
            if (this.ticks === 60) {
                this.timeUnit = "min";
                this.ticks = Math.floor(this.ticks / 60);
            }
            else if(this.ticks === 60) {
                
                this.timeUnit = "h" + "min";
            }
        },100);
     
   }
   
    stopTimer(val) {
                
        clearInterval(this.timer);
        this.btnValue = "Start";
        this.btnStatus = true;
        setTimeout(() => {
            this.ticks = 0;
            this.timeUnit = "Sec";
        },10);

        var newTask = {
            text: this.text
        }
        var newProject = {
            name: val
        }
        this.task.push(newTask);
        this._timerService.addTask(newTask);

        this.selected_project.push(newProject);
        this._projectService.addProjects(newProject);
  
    }
    calcSpentTime () {
        this.endRange = checkTime(new Date().getHours()) + ':' + checkTime(new Date().getMinutes());
         this.eR = new Date();
          function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }
              
        this.hEnd = checkTime(this.eR.getHours());
        this.mEnd= checkTime(this.eR.getMinutes());
        this.sEnd = checkTime(this.eR.getSeconds());

        this.h = checkTime(this.hEnd - this.hStart);
        this.m = checkTime(this.mEnd - this.mStart);
        this.s = checkTime(this.sEnd - this.sStart);

        var newHours = {
            hours: this.h
        }
        var newMinutes = {
            minutes: this.m
        }
        var newSeconds = {
            seconds: this.s
        }
        this.spentTime.push(newHours, newMinutes, newSeconds);
   
        var newErange = {
            eRange: this.endRange
        }
           var newSrange = {
            sRange: this.startRange
        }
        this.timeRange.push(newErange, newSrange);
                     
    }
}