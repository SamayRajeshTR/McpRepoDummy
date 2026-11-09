import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-progress-text-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-progress-text-demo.component.html',
})
export class SafProgressTextDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'progress-text', label: 'Progress text' },
  ];
}
