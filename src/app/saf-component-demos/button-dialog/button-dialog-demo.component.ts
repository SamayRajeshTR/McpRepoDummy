import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { SafDialogInstance } from '@saffron/core-components';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

type DialogCloseEvent = CustomEvent<{ reason: string }>;

@Component({
  selector: 'app-button-dialog-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './button-dialog-demo.component.html',
  styleUrls: ['./button-dialog-demo.component.scss'],
})
export class ButtonDialogDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'dialog-uncontrolled', label: 'Uncontrolled dialog' },
    { id: 'dialog-controlled', label: 'Controlled dialog' },
  ];

  /**
   * Uncontrolled example
   *
   * Trigger close button -> close event -> interrupt via event.preventDefault() or let it proceed
   * -> sync app state open -> set button aria-expanded
   *
   * Show/Hide programmatically using dialog.show() and dialog.hide()
   */
  uncontrolledOpen = false;
  interceptionMessage = '';

  @ViewChild('uncontrolledDialog')
  private uncontrolledDialogRef?: ElementRef<SafDialogInstance>;

  /**
   * Controlled example
   *
   * Trigger close button -> close event -> interrupt by returning early or let it proceed
   * -> sync app state open -> set button aria-expanded
   *
   * Show/Hide programmatically by setting controlledOpen to true or false
   */
  controlledOpen = false;

  @ViewChild('controlledDialog')
  private controlledDialogRef?: ElementRef<SafDialogInstance>;

  toggleUncontrolledDialog() {
    const dialog = this.uncontrolledDialogRef?.nativeElement;

    if (!dialog) {
      return;
    }

    if (this.uncontrolledOpen) {
      dialog.hide();
      this.uncontrolledOpen = false;
    } else {
      dialog.show();
      this.uncontrolledOpen = true;
      setTimeout(() => dialog.focus());
    }
  }

  onUncontrolledClose(event: Event) {
    const closeEvent = event as DialogCloseEvent;

    if (closeEvent.detail?.reason === 'escape') {
      closeEvent.preventDefault();
      this.interceptionMessage = 'Dialog close event with reason escape key was intercepted and prevented.';
    } else {
      this.uncontrolledOpen = false;
      this.interceptionMessage = '';
    }
  }

  cancelUncontrolledDialog() {
    this.uncontrolledDialogRef?.nativeElement.hide();
    this.uncontrolledOpen = false;
  }

  toggleControlledDialog() {
    this.controlledOpen = !this.controlledOpen;

    if (this.controlledOpen) {
      setTimeout(() => this.controlledDialogRef?.nativeElement.focus());
    }
  }

  onControlledClose(event: Event) {
    const closeEvent = event as DialogCloseEvent;

    if (closeEvent.detail?.reason === 'escape') {
      return;
    }

    this.controlledOpen = false;
  }

  closeControlledDialog() {
    this.controlledOpen = false;
  }
}
