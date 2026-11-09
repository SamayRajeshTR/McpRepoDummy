import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-skip-link-group-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-skip-link-group-demo.component.html',
  styleUrls: ['./saf-skip-link-group-demo.component.scss'],
})
export class SafSkipLinkGroupDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'skip-link-group-title', label: 'Skip Link Group' },
  ];
}
