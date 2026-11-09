import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-anchor-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-anchor-demo.component.html',
  styleUrls: ['./saf-anchor-demo.component.scss'],
})
export class SafAnchorDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'anchor-inline', label: 'Inline' },
    { id: 'anchor-cta', label: 'Anchor CTA' },
  ];

  handleOnClickForAnchor() {
    alert('Anchor without href');
  }
}
