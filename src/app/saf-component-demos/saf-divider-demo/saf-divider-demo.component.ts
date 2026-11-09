import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-divider-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-divider-demo.component.html',
  styleUrls: ['./saf-divider-demo.component.scss'],
})
export class SafDividerDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'divider-horizontal', label: 'Horizontal' },
    { id: 'divider-vertical', label: 'Vertical' },
  ];
}
