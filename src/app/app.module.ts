import {NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {TimerComponent} from "./app.timer.component";
import {FormsModule} from "@angular/forms";
import { transformDate } from './transform.date.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    TimerComponent,
    transformDate
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}