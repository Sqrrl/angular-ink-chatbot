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

  @ViewChild('input') public inputElementRef: ElementRef;

  constructor(private storyService: StoryService) {}

  public ngOnInit() {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.userInteraction instanceof SimpleChange) {
      if (changes.userInteraction.currentValue && changes.userInteraction.currentValue.type === UserInteractionType.TEXT) {
        setTimeout(() => {
          this.inputElementRef.nativeElement.focus();
        });
      }
    }
  }

  public trigger(value: Choice | string) {
    this.storyService.triggerUserInteraction(value);
  }
}
