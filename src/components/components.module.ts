import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { MessageComponent } from './message/message.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
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
