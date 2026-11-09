import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

type AlertType = 'inline' | 'toast';
type AlertAppearance =
  | 'error'
  | 'informational'
  | 'success'
  | 'warning'
  | 'neutral';
type AlertOptions = [AlertType, AlertAppearance] | undefined;

@Component({
  selector: 'saf-alert-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  templateUrl: './saf-alert-demo.component.html',
  styles: [
    '.Component-demo saf-alert { display: block; margin-bottom: 16px; }',
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SafAlertDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'alert-error', label: 'Error' },
    { id: 'alert-informational', label: 'Informational' },
    { id: 'alert-neutral', label: 'Neutral' },
    { id: 'alert-success', label: 'Success' },
    { id: 'alert-warning', label: 'Warning' },
  ];

  alertOptions: AlertOptions = undefined;
  showAlert = false;
  hideCloseButton = false;

  handleHideCloseButtonClick() {
    this.hideCloseButton = !this.hideCloseButton;
  }

  handleAlertOptionsClick(arr: AlertOptions) {
    console.log(
      `🚀 ~ SafAlertDemoComponent ~ handleAlertOptionsClick ~ arr:`,
      arr,
    );
    this.alertOptions = arr;
  }
  handleonclose() {
    this.alertOptions = undefined;
  }
}
