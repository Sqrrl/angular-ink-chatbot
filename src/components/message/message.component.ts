import { Component, Input, OnInit } from '@angular/core';
import { StoryPoint } from '../../interfaces/story-point.interface';

@Component({
  selector: 'bot-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  @Input() public storyPoint: StoryPoint;

  constructor() {}

  public ngOnInit() {}
}
