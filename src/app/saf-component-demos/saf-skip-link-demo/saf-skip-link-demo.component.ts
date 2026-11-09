import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-skip-link-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-skip-link-demo.component.html',
  styleUrls: ['./saf-skip-link-demo.component.scss'],
})
export class SafSkipLinkDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'skip-link-title', label: 'Skip Link' },
  ];
}
