import * as inkjs from 'inkjs';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Choice } from 'inkjs';
import { StoryPoint } from '../interfaces/story-point.interface';
import { StoryPointOptions } from '../interfaces/story-point-options.interface';
import { StoryEventType } from '../enums/story-event-type.enum';
import { UserInteraction } from '../interfaces/user-interaction.interface';
import { UserInteractionType } from '../enums/choice-type.enum';
import { StoryPointSender } from '../enums/story-point-sender.enum';
import { UserInteractionHandlerService } from './user-interaction-handler.service';

@Injectable()
export class StoryService {
  private paused = false;

  public currentUserInteraction: UserInteraction;
  public events: Subject<any>;
  public story: any;
  public storyPoints: any[];

  constructor(private userInteractionHandlerService: UserInteractionHandlerService) {
    this.events = new Subject();
    this.story = new inkjs.Story(require('../ink/story.json'));
    this.storyPoints = [];

    this.userInteractionHandlerService.init(this.story);
  }

  public start() {
    this.paused = false;
    this.proceed();
  }

  public pause() {
    this.paused = true;
  }

  public triggerUserInteraction(value: Choice | string) {
    if (typeof value === 'string') {
      if (this.currentUserInteraction.handler) {
        this.userInteractionHandlerService.handle(this.currentUserInteraction.handler, value);
      }

      if (this.currentUserInteraction.stateVar) {
        this.story.variablesState.$(this.currentUserInteraction.stateVar, value);
      }

      this.story.ChooseChoiceIndex(0);
    } else {
      this.story.ChooseChoiceIndex(value.index);
    }

    this.currentUserInteraction = null;
    this.proceed();
  }

  private proceed() {
    if (!this.paused && this.story) {
      if (this.story.canContinue) {
        const storyPoint = this.buildStoryPointFromMessage(this.story.Continue());

        setTimeout(() => {
          this.storyPoints.push(storyPoint);
          this.events.next({
            type: StoryEventType.STORY_POINT_ADDED,
            data: storyPoint
          });

          this.proceed();
        }, storyPoint.options.delay);
      } else if (this.story.currentChoices.length > 0) {
        this.currentUserInteraction = this.buildUserInteractionFromChoices(this.story.currentChoices);
        this.events.next({
          type: StoryEventType.USER_INTERACTION_STARTED,
          data: this.currentUserInteraction
        });
      }
    }
  }

  private buildStoryPointFromMessage(message: string): StoryPoint {
    const currentTag = this.story.currentTags.length > 0 ? this.story.currentTags[0] : '{}';

    return {
      displayMessage: message,
      originalMessage: message,
      options: this.buildStoryPointOptionsFromTag(currentTag)
    }
  }

  private buildStoryPointOptionsFromTag(tag: string): StoryPointOptions {
    const customOptions: StoryPointOptions = JSON.parse(tag);

    return Object.assign({
      delay: (customOptions.sender === StoryPointSender.USER) ? 0 : 2000,
      sender: StoryPointSender.BOT,
      typeDuration: 1000
    }, customOptions);
  }

  private buildUserInteractionFromChoices(choices: Choice[]): UserInteraction {
    const currentTag = this.story.currentTags ? this.story.currentTags[0] : '{}';

    choices = choices.map(c => {
      return {
        index: c.index,
        text: c.text
      };
    });

    return Object.assign({
      choices: choices,
      type: UserInteractionType.DEFAULT
    }, JSON.parse(currentTag).userInteraction);
  }
}
