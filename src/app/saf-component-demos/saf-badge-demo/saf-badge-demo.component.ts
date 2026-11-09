import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-badge-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  templateUrl: './saf-badge-demo.component.html',
  styles: ['saf-badge { margin-bottom: 8px; margin-inline-end: 24px; }'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SafBadgeDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'badge-without-icon', label: 'Without icon' },
    { id: 'badge-with-icon', label: 'With icon' },
    { id: 'badge-counter', label: 'Counter' },
    { id: 'badge-attached-to-parent', label: 'Badge attached to parent' },
  ];
}
