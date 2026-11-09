import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-toolbar-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-toolbar-demo.component.html',
})
export class SafToolbarDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'toolbar-default', label: 'Basic' },
    { id: 'toolbar-full-example', label: 'Full example' },
    { id: 'toolbar-compact-toolbar', label: 'Compact toolbar' },
  ];
}
