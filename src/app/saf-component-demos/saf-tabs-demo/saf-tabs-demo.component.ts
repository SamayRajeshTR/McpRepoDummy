import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-tabs-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-tabs-demo.component.html',
})
export class SafTabsDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'tabs-horizontal', label: 'Horizontal' },
    { id: 'tabs-vertical', label: 'Vertical' },
    { id: 'tabs-disabled', label: 'Disabled' },
    { id: 'tabs-with-counter', label: 'With Counter' },
  ];

  showSelectedTabText = '';
  tabTitles = ['Tab Title', 'Tab two', 'Tab three', 'Tab Four', 'Tab Five'];
  tabPanels = [
    'Tab panel 1',
    'Tab panel 2',
    'Tab panel 3',
    'Tab panel 4',
    'Tab panel 5',
  ];

  handleTabChange(selectedTab: any) {
    this.showSelectedTabText = 'Tabs clicked from ' + selectedTab;
  }
}
