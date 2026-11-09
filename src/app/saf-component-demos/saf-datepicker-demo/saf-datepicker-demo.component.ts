import { FormsModule } from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-datepicker-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-datepicker-demo.component.html',
})
export class SafDatepickerDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'datepicker-simple-date-picker', label: 'Simple Date Picker' },
    { id: 'datepicker-custom-date-format', label: 'Custom Date Format' },
    { id: 'datepicker-min-max-date-range', label: 'Min Max Date Range' },
    { id: 'datepicker-disabled-dates', label: 'Disabled Dates' },
    { id: 'datepicker-validation-message', label: 'Validation Message' },
  ];

  disableDates = (day: Date) => {
    const currentDay = day.getDay();
    if (currentDay === 6 || currentDay === 0) {
      return true;
    }
    return false;
  };

  validationMessageData = {
    error: {
      invalid: true,
      required: true,
      validationMessage: 'Date is not correct',
      value: new Date('12/12/2025'),
      onChange: (event: any) => {
        this.validationMessageData.error.value = new Date(event.detail);
      },
    },
    success: {
      isSuccess: true,
      required: true,
      validationMessage: 'Date is correct',
      value: new Date('12/12/2025'),
      onChange: (event: any) => {
        this.validationMessageData.success.value = new Date(event.detail);
      },
    },
  };
}
