import { Choice } from 'inkjs';
import { UserInteractionType } from '../enums/choice-type.enum';

export interface UserInteraction {
  choices?: Choice[];
  handler?: string;
  placeholder?: string;
  stateVar?: string;
  type?: UserInteractionType;
  validator?: string;
}
