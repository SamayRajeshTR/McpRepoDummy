import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-progress-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-progress-demo.component.html',
})
export class SafProgressDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'progress-default', label: 'Default' },
    { id: 'progress-indeterminate', label: 'Indeterminate' },
    { id: 'progress-paused', label: 'Paused' },
  ];
}
