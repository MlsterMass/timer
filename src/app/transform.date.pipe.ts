import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transformDate'
})

export class transformDate implements PipeTransform {

    equalDate: any = new Date().getTime();
    recentDate: any = new Date().getTime();
    transform(now: any, args: any[]): any {
          if(this.equalDate == this.recentDate){
             now = "Today";
         }
    }
}