import * as moment from 'moment';

import { Injectable } from '@angular/core';

@Injectable()
export class UserInteractionHandlerService {
  private story: any;

  constructor() {}

  public init(story: any) {
    this.story = story;
  }

  public handle(handler: string, value: string) {
    if (typeof this[handler] === 'function') {
      this[handler](value);
    }
  }

  private birthdayToAge(value: string) {
    this.story.variablesState.$('age', String(moment().diff(moment(value, 'MM/DD/YYYY'), 'years')));
  }
}
