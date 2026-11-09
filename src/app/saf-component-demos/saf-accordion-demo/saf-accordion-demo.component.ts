import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-accordion-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-accordion-demo.component.html',
})
export class SafAccordionDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'accordion-single-expand-mode', label: 'Single expand mode' },
    { id: 'accordion-multi-expand-mode', label: 'Multi-expand mode' },
    { id: 'accordion-heading-fill-with-badge', label: 'Heading fill with badge' },
    { id: 'accordion-heading-hug-with-badge', label: 'Heading hug with badge' },
    { id: 'accordion-compact-accordion', label: 'Compact accordion' },
  ];

  multiExpandText = 'Expand an accordion item';
  singleExpandText = 'Expand an accordion item';
  withBadgeText = 'Expand an accordion item';
  compactExpandText = 'Expand an accordion item';

  handleAccordionChange(accordionType: any) {
    if (accordionType === 'multi expand mode') {
      this.multiExpandText = 'Accordion has been expanded for ' + accordionType;
    } else if (accordionType === 'single expand mode') {
      this.singleExpandText =
        'Accordion has been expanded for ' + accordionType;
    } else if (accordionType === 'with badge') {
      this.withBadgeText =
        'Accordion has been expanded for ' + accordionType + ' example';
    } else if (accordionType === 'compact') {
      this.compactExpandText =
        'Accordion has been expanded for ' + accordionType + ' example';
    } else {
      this.multiExpandText = '';
      this.singleExpandText = '';
      this.withBadgeText = '';
      this.compactExpandText = '';
    }
  }
}
