import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatScrollDirective } from './chat-scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChatScrollDirective
  ],
  exports: [
    ChatScrollDirective
  ]
})
export class DirectivesModule { }
