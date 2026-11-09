import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-logo-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-logo-demo.component.html',
  styleUrls: ['./saf-logo-demo.component.scss'],
})
export class SafLogoDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'logo-default-background', label: 'Default Background' },
    { id: 'logo-inverse-background', label: 'Inverse Background' },
    { id: 'logo-product-default-background', label: 'Product Default Background' },
    { id: 'logo-product-inverse-background', label: 'Product Inverse Background' },
  ];
}
