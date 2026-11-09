import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-empty-state-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-empty-state-demo.component.html',
})
export class SafEmptyStateDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'empty-state-default', label: 'Default' },
    { id: 'empty-state-center-aligned', label: 'Center Aligned' },
  ];
}
