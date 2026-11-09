import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-product-header-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-product-header-demo.component.html',
})
export class SafProductHeaderDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'product-header-with-avatar', label: 'Header with Avatar' },
    { id: 'product-header-without-settings', label: 'Header Without Settings' },
  ];
}
