import { StoryEventType } from '../enums/story-event-type.enum';

export interface StoryEvent {
  type: StoryEventType;
  data: any;
}
