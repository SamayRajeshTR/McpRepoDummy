import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-status-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-status-demo.component.html',
})
export class SafStatusDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'status-error', label: 'Error' },
    { id: 'status-info', label: 'Info' },
    { id: 'status-paused', label: 'Paused' },
    { id: 'status-success', label: 'Success' },
    { id: 'status-warning', label: 'Warning' },
  ];
}
