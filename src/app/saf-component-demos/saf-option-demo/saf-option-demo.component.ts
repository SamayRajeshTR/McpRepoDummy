import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-option-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-option-demo.component.html',
})
export class SafOptionDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'listbox-option-default-option', label: 'Default option' },
    { id: 'listbox-option-compact-option', label: 'Compact option' },
    { id: 'listbox-option-selected-option', label: 'Selected option' },
    { id: 'listbox-option-option-with-start-and-end-slots', label: 'Option with start and end slots' },
  ];
}
