import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-disclosure-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-disclosure-demo.component.html',
})
export class SafDisclosureDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'disclosure', label: 'Disclosure' },
  ];
}
