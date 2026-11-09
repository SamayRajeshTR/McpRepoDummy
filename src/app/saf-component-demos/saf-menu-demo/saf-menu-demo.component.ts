import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-menu-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-menu-demo.component.html',
})
export class SafMenuDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'menu-with-checkbox-items', label: 'With checkbox items' },
    { id: 'menu-with-aria-current', label: 'With aria-current' },
    { id: 'menu-with-nested-items', label: 'With nested items' },
    { id: 'menu-with-radio-items', label: 'With radio items' },
    { id: 'menu-compact-menu', label: 'Compact menu' },
  ];

  selectedMenuText = '';
  selectedSubMenuText = '';
  selectedItem: string | null = null;

  // Top-level items use aria-current="true" when any child is the selected page.
  getTopLevelAriaCurrent(id: string): 'true' | null {
    return this.selectedItem?.startsWith(id + '.') ? 'true' : null;
  }

  // Leaf/current page items use aria-current="page".
  getChildAriaCurrent(id: string): 'page' | null {
    return this.selectedItem === id ? 'page' : null;
  }

  handleMenuItemChange(type: any, subMenuType: any) {
    if (subMenuType == 'No') {
      this.selectedMenuText = 'Clicked from ' + type;
      this.selectedSubMenuText = '';
    } else {
      this.selectedMenuText = 'Clicked from ' + type;
    }
  }

  handleSubMenuItemChange(subMenuType: any) {
    this.selectedSubMenuText = 'Clicked from expanded ' + subMenuType;
  }
}
