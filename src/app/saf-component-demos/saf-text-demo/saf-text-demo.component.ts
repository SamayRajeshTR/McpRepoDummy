import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-text-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-text-demo.component.html',
})
export class SafTextDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'text-appearance', label: 'Text appearance' },
    { id: 'text-heading', label: 'Text - Semantic heading' },
    { id: 'text-heading-with-link', label: 'Text - Semantic heading with link' },
    { id: 'text-paragraph', label: 'Text - Semantic paragraph text' },
  ];
}
