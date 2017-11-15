import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { StoryPoint } from '../../interfaces/story-point.interface';
import { UserInteraction } from '../../interfaces/user-interaction.interface';

@Component({
  selector: 'bot-message-panel',
  templateUrl: './message-panel.component.html'
})
export class MessagePanelComponent implements OnInit {
  constructor(private storyService: StoryService) {}

  public ngOnInit() {}

  get currentUserInteraction(): UserInteraction {
    return this.storyService.currentUserInteraction;
  }

  get storyPoints(): StoryPoint[] {
    return this.storyService.storyPoints;
  }
}
