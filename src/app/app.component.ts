import { Component } from '@angular/core';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'bot-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private storyService: StoryService) {
    this.storyService.start();
  }
}
