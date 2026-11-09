import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-message-box-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-message-box-demo.component.html',
})
export class SafMessageBoxDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'message-box-default', label: 'Default' },
    { id: 'message-box-user-response', label: 'User response' },
  ];
}
