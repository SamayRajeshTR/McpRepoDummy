import { FormsModule } from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-checkbox-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-checkbox-demo.component.html',
  styles: [
    '.Component-demo saf-checkbox:not(:last-child) { margin-inline-end: 40px; }',
  ],
})
export class SafCheckboxDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'checkbox-default', label: 'Default' },
    { id: 'checkbox-checked', label: 'Checked' },
    { id: 'checkbox-disabled', label: 'Disabled' },
    { id: 'checkbox-indeterminate', label: 'Indeterminate' },
    { id: 'checkbox-controlled', label: 'Controlled' },
    { id: 'checkbox-invalid', label: 'Invalid' },
  ];

  checked = true;
  showSelectedCheckboxText = '';
  handleCheckboxChange(selectedCheckbox: any) {
    this.showSelectedCheckboxText = 'Clicked from ' + selectedCheckbox;
  }
  onChangeHandler(event: Event) {
    this.checked = (<HTMLInputElement>event.target).checked;
  }
}
