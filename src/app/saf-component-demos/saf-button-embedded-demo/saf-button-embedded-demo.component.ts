import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-button-embedded-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-button-embedded-demo.component.html',
})
export class SafButtonEmbeddedDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'button-embedded-default', label: 'Default' },
    { id: 'button-embedded-compact-button-embedded', label: 'Compact button embedded' },
  ];
}
