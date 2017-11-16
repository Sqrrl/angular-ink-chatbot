import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { MessageComponent } from './message/message.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule
  ],
  declarations: [
    ActionBarComponent,
    MessageComponent,
    MessagePanelComponent
  ],
  exports: [
    ActionBarComponent,
    MessageComponent,
    MessagePanelComponent
  ]
})
export class ComponentsModule { }
