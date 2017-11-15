import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryService } from './story.service';
import { UserInteractionHandlerService } from './user-interaction-handler.service';
import { UserInteractionValidatorService } from './user-interaction-validator.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StoryService,
    UserInteractionHandlerService,
    UserInteractionValidatorService
  ]
})
export class ServicesModule { }
