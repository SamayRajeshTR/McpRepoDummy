import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-button-group-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-button-group-demo.component.html',
})
export class SafButtonGroupDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'button-group-default', label: 'Default' },
    { id: 'button-group-icon-only', label: 'Icon only' },
    { id: 'button-group-compact-button-group', label: 'Compact button group' },
    { id: 'button-group-vertical-button-group', label: 'Vertical button group' },
  ];
}
