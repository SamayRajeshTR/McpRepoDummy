import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-back-to-top-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-back-to-top-demo.component.html',
})
export class SafBackToTopDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'back-to-top', label: 'Back to Top' },
  ];
}
