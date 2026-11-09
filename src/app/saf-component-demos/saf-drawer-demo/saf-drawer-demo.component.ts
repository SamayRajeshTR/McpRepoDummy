import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild
} from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';
import { BodyPortalDirective } from '../../layout/body-portal/index';

@Component({
  selector: 'saf-drawer-demo',
  imports: [LinkIconComponent, InPageNavigationComponent, BodyPortalDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-drawer-demo.component.html',
  styleUrls: ['./saf-drawer-demo.component.scss'],
})
export class SafDrawerDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'drawer', label: 'Drawer' },
    { id: 'drawer-toggle', label: 'Toggle drawer' },
    { id: 'drawer-toggle-bottom-right-drawer', label: 'Open bottom drawer' },
  ];

  @ViewChild('drawerRef', { static: false }) drawerRef?: ElementRef;
  @ViewChild('bottomDrawerRef', { static: false }) bottomDrawerRef?: ElementRef;
  @ViewChild('nestedDrawerRef', { static: false }) nestedDrawerRef?: ElementRef;

  isHidden = true;

  hideDrawer() {
    this.isHidden = true;
  }

  toggleDrawer(ref: string) {
    if (ref === 'drawerRef') {
      this.drawerRef?.nativeElement.show();
    } else if (ref === 'bottomDrawerRef') {
      this.bottomDrawerRef?.nativeElement.show();
    } else if (ref === 'nestedDrawerRef') {
      this.nestedDrawerRef?.nativeElement.show();
    }
  }
}
