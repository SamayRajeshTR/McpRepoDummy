import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-list-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-list-demo.component.html',
})
export class SafListDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'ordered-list', label: 'Ordered list' },
    { id: 'unordered-nested-list', label: 'Unordered nested list' },
    { id: 'ordered-nested-list', label: 'Ordered nested list' },
    { id: 'ticked-list', label: 'Unordered ticked list' },
  ];
}
