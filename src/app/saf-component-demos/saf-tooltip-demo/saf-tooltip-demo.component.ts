import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-tooltip-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  templateUrl: './saf-tooltip-demo.component.html',
  styles: [
    `
      saf-button {
        margin-bottom: var(--saf-spacing-4);
      }
      saf-button:not(:last-child) {
        margin-inline-end: var(--saf-spacing-6);
      }
    `,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SafTooltipDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'tooltip-popover', label: 'Popover' },
  ];
}
