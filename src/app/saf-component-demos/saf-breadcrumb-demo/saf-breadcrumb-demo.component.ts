import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-breadcrumb-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-breadcrumb-demo.component.html',
})
export class SafBreadcrumbDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'breadcrumb-default', label: 'Default' },
    { id: 'breadcrumb-rtl', label: 'RTL' },
  ];
}
