import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-card-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-card-demo.component.html',
})
export class SafCardDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'card-vertical', label: 'Vertical' },
    { id: 'card-vertical-compact', label: 'Vertical compact' },
    { id: 'card-vertical-inset', label: 'Vertical inset' },
    { id: 'card-vertical-inset-compact', label: 'Vertical inset compact' },
    { id: 'card-vertical-icon', label: 'Vertical icon' },
    { id: 'card-horizontal', label: 'Horizontal' },
    { id: 'card-horizontal-compact', label: 'Horizontal compact' },
    { id: 'card-horizontal-inset', label: 'Horizontal inset' },
    { id: 'card-horizontal-inset-compact', label: 'Horizontal inset compact' },
    { id: 'card-horizontal-icon', label: 'Horizontal icon' },
    { id: 'card-no-image', label: 'No image' },
  ];
}
