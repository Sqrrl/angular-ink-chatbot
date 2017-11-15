import { StoryPointSender } from '../enums/story-point-sender.enum';

export interface StoryPointOptions {
  delay?: number;
  sender?: StoryPointSender;
  typeDuration?: number;
}
