import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-metadata-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-metadata-demo.component.html',
})
export class SafMetadataDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'metadata-default', label: 'Default' },
    { id: 'metadata-slotted-separator', label: 'With slotted separator' },
  ];
}
