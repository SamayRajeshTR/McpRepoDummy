import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-button-menu-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './button-menu-demo.component.html',
})
export class ButtonMenuDemoComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  inPageLinks: InPageNavigationLink[] = [
    { id: 'button-and-menu', label: 'Button and menu' },
  ];

  open: boolean = false;

  @ViewChild('menu', { static: false }) menu: any;
  @ViewChild('trigger', { static: false }) trigger: any;

  private triggerBtn: HTMLElement | null = null;
  clickOutsideHandler: any;

  items = [
    { text: 'Menu item 1', id: 'menu_item_1' },
    { text: 'Menu item 2', id: 'menu_item_2' },
    { text: 'Menu item 3', id: 'menu_item_3' },
  ];

  ngOnInit() {
    this.clickOutsideHandler = this.handleClickOutside.bind(this);
    document.addEventListener('click', this.clickOutsideHandler);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.clickOutsideHandler);
  }

  ngAfterViewInit(): void {
    // Identify the button within chip as it is the focused element.
    this.triggerBtn =
      this.trigger.nativeElement.shadowRoot.querySelector('.control');
  }
  clickHandler() {
    this.open = !this.open;
    if (this.open) {
      setTimeout(() => {
        this.menu.nativeElement.focus();
      });
    }
  }

  closeMenu() {
    this.open = false;
    setTimeout(() => {
      this.triggerBtn?.focus();
    });
  }

  handleClickOutside(event: MouseEvent) {
    if (this.trigger.nativeElement.contains(event.target)) {
      // If the event target is the button itself, return immediately
      return;
    }

    if (this.open && !this.menu.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  handleMenuItemKeydown(e: KeyboardEvent) {
    if (
      e.key === 'Enter' ||
      e.key === ' ' ||
      (e.shiftKey && e.key === 'Tab') ||
      e.key === 'Tab' ||
      e.key === 'Escape'
    ) {
      this.closeMenu();
    }
  }

  handleTriggerKeydown(e: KeyboardEvent) {
    // The menu can be opened by using the Down Arrow, Up Arrow, Enter key or the Spacebar.
    // https://trten.sharepoint.com/sites/intr-digital-accessibility-coe/SitePages/Dropdown---Actions-Menu.aspx#functional-requirements
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      this.open = true;
      setTimeout(() => {
        this.menu.nativeElement.focus();
      });
    }
  }
}
