import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-listbox-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-listbox-demo.component.html',
})
export class SafListboxDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'listbox-default-listbox', label: 'Default listbox' },
    { id: 'listbox-compact-listbox', label: 'Compact listbox' },
    { id: 'listbox-listbox-with-multiple-selection', label: 'Listbox with multiple selection' },
  ];
}
