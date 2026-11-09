import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-switch-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-switch-demo.component.html',
  styleUrls: ['./saf-switch-demo.component.scss'],
})
export class SafSwitchDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'switch-title', label: 'Switch' },
  ];

  switchStatusText = '';
  switchStatus = 'off';

  handleOnSwitchChange = (current: SafSwitchDemoComponent) => {
    const value = current.switchStatus === 'on' ? 'off' : 'on';
    this.switchStatus = value;
    this.switchStatusText = `Switch status changed to ${value}`;
  };
}
