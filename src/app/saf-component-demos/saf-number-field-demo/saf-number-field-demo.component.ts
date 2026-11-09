import { FormsModule } from '@angular/forms';
import {
  Component,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-number-field-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-number-field-demo.component.html',
})
export class SafNumberFieldDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'number-field-default', label: 'Default' },
    { id: 'number-field-disabled', label: 'Disabled' },
    { id: 'number-field-readonly', label: 'Readonly' },
    { id: 'number-field-required', label: 'Required' },
    { id: 'number-field-compact-number-field', label: 'Compact number field' },
  ];

  @ViewChild('numberField') numberField!: ElementRef;
  minValue = 1;
  maxValue = 6;
  isInvalid = false;
  validationMessage = '';

  constructor(private elementRef: ElementRef) {}

  handleChange(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const { value } = event.target as HTMLInputElement;
    const number = Number(value);
    if (
      number < this.minValue ||
      number > this.maxValue ||
      number === undefined
    ) {
      this.isInvalid = true;
      this.validationMessage = `Value must be between ${this.minValue} and ${this.maxValue}`;
    }
    this.isInvalid = false;
    this.validationMessage = '';
    this.numberField.nativeElement.value = String(number);
  }

  handleReset() {
    this.numberField.nativeElement.value = undefined;
    this.isInvalid = false;
    this.validationMessage = '';
  }
  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!this.numberField.nativeElement.value) {
      this.isInvalid = true;
      this.validationMessage = 'Please enter a value';
    } else {
      console.info('Form submitted!');
    }
  }
}
