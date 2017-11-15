import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    BrowserModule,

    ComponentsModule,
    ServicesModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
