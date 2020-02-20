import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, WjGridModule, WjGridFilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }