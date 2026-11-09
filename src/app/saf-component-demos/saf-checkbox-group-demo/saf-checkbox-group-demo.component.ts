import {
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-checkbox-group-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-checkbox-group-demo.component.html',
})
export class SafCheckboxGroupDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'checkbox-group-default', label: 'Default' },
    { id: 'checkbox-group-horizontal', label: 'Horizontal' },
  ];

  @ViewChild('checkboxGroupValue') checkboxGroupValue!: ElementRef;
  isInvalid: boolean = false; // set initial value to false
  selectedList: string | string[] | undefined =
    this.checkboxGroupValue?.nativeElement?.value;
  @Output() isInvalidChange = new EventEmitter<boolean>();
  validationMessage: string | undefined = '';

  constructor(private elementRef: ElementRef) {}

  onChange() {
    // Update the selectedList value when the checkbox group changes
    this.selectedList = this.checkboxGroupValue?.nativeElement?.value;
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
    this.selectedList = '';
    this.validationMessage = '';
  }

  onValidate() {
    if (!this.selectedList || this.selectedList.length === 0) {
      this.isInvalid = true;
      this.validationMessage = 'Please select at least one option';
      this.isInvalidChange.emit(true);
    } else {
      this.isInvalid = false;
      this.isInvalidChange.emit(false);
      this.validationMessage = '';
    }
  }
}
