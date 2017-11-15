import * as animejs from 'animejs';

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StoryPoint } from '../../interfaces/story-point.interface';

@Component({
  selector: 'bot-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  @Input() public storyPoint: StoryPoint;

  @ViewChild('bubble') private bubbleElementRef: ElementRef;

  constructor() {}

  public ngOnInit() {
    animejs({
      targets: this.bubble,
      opacity: [0, 1],
      scaleX: [0, 1],
      duration: 800,
      elasticity: 400
    });
  }

  get bubble(): HTMLElement {
    return this.bubbleElementRef.nativeElement;
  }
}
