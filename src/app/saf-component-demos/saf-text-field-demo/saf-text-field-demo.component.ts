import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-text-field-demo',
  imports: [FormsModule, ReactiveFormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-text-field-demo.component.html',
  styles: ['.Component-container { width: 356px; }'],
})
export class SafTextFieldDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'textfield-default', label: 'Default' },
    { id: 'textfield-help', label: 'Help text' },
    { id: 'textfield-disabled', label: 'Disabled' },
    { id: 'textfield-invalid', label: 'Invalid' },
    { id: 'textfield-password', label: 'Password' },
    { id: 'textfield-readonly', label: 'Readonly' },
    { id: 'textfield-required', label: 'Required' },
    { id: 'textfield-success', label: 'Success' },
    { id: 'text-field-compact-text-field', label: 'Compact text field' },
  ];

  @ViewChild('textField') textField!: ElementRef;
  isInvalid: boolean = false; // set initial value to false
  value: string | string[] | undefined = this.textField?.nativeElement?.value;
  validationMessage: string | undefined = '';

  constructor(private elementRef: ElementRef) {}

  onChange() {
    // Update the selectedList value when the checkbox group changes
    this.value = this.textField?.nativeElement?.value;
    // Allows for live validation on every interaction with component
    this.onValidate();
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.onChange();
    this.onValidate();
  }

  onReset() {
    this.onChange();
    this.isInvalid = false;
    this.value = '';
    this.validationMessage = '';
  }

  onValidate() {
    if (!this.value || this.value.length === 0) {
      this.isInvalid = true;
      this.validationMessage = 'Please enter some text';
    } else {
      this.isInvalid = false;
      this.validationMessage = '';
    }
  }

  submitButtonText = '';

  saffronSubmitButtonClick() {
    this.submitButtonText = 'You clicked on submit button';
  }
}
