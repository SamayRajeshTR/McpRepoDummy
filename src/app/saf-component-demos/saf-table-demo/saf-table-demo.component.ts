import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-table-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-table-demo.component.html',
})
export class SafTableDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'table-default', label: 'Default' },
    { id: 'table-compact', label: 'Compact' },
    { id: 'table-no-inline-borders', label: 'No inline-borders' },
    { id: 'table-no-alternating-rows', label: 'No alternating-rows' },
    { id: 'table-subtle-header', label: 'Subtle header' },
    { id: 'table-strong-header', label: 'Strong header' },
  ];
}
