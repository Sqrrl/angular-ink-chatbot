import * as animejs from 'animejs';

import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { UserInteraction } from '../../interfaces/user-interaction.interface';
import { StoryService } from '../../services/story.service';
import { Choice } from 'inkjs';
import { UserInteractionType } from '../../enums/choice-type.enum';

@Component({
  selector: 'bot-action-bar',
  templateUrl: './action-bar.component.html'
})
export class ActionBarComponent implements OnInit, OnChanges {
  @Input() public userInteraction: UserInteraction;

  @ViewChild('bar') public barElementRef: ElementRef;
  @ViewChild('input') public inputElementRef: ElementRef;

  public inputValue: string;

  constructor(private storyService: StoryService) {}

  public ngOnInit() {
    this.animateIn();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.userInteraction instanceof SimpleChange) {
      this.inputValue = '';

      if (changes.userInteraction.currentValue && changes.userInteraction.currentValue.type === UserInteractionType.TEXT) {
        this.animateIn();

        setTimeout(() => {
          this.inputElementRef.nativeElement.focus();
        });
      }
    }
  }

  public trigger(value: Choice | string) {
    this.storyService.triggerUserInteraction(value);
  }

  private animateIn() {
    animejs({
      targets: this.bar,
      opacity: [0, 1],
      duration: 500,
      easing: 'linear'
    });
  }

  get bar(): HTMLElement {
    return this.barElementRef.nativeElement;
  }
}
