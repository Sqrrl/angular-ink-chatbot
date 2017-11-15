import { StoryPointOptions } from './story-point-options.interface';

export interface StoryPoint {
  displayMessage: string;
  originalMessage: string;
  options?: StoryPointOptions;
}
