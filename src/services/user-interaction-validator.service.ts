import * as moment from 'moment';

import { Injectable } from '@angular/core';

@Injectable()
export class UserInteractionValidatorService {
  constructor() {}

  public validate(validator: string, value: any): string | null {
    const validatorFnName = 'validate' + validator.charAt(0).toUpperCase() + validator.slice(1);

    if (typeof this[validatorFnName] === 'function') {
      return this[validatorFnName](value);
    } else {
      return null;
    }
  }

  private validateDate(value: any): string | null {
    value = String(value);

    if (moment(value, 'MM/DD/YYYY').isValid()) {
      return null;
    } else {
      return 'date';
    }
  }
}
