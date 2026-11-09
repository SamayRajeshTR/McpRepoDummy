import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-button-demo',
  templateUrl: './saf-button-demo.component.html',
  styles: ['saf-button { margin-bottom: 8px; margin-inline-end: 24px; }'],
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SafButtonDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'button-compact-button', label: 'Compact button' },
    { id: 'button-with-icon---primary', label: 'With icon - primary' },
    { id: 'button-with-icon---secondary', label: 'With icon - secondary' },
    { id: 'button-with-icon---tertiary', label: 'With icon - tertiary' },
    { id: 'button-layout-block-button', label: 'Layout block button' },
    { id: 'button-submit-and-reset', label: 'Submit and reset' },
  ];

  buttonText = 'Click one of the buttons';
  primaryButtonText = 'Click one of the buttons';
  secondaryButtonText = 'Click one of the buttons';
  tertiaryButtonText = 'Click one of the buttons';
  compactButtonText = 'Click one of the buttons';

  buttonClick(type: any) {
    this.buttonText = 'You clicked on ' + type + ' button';
  }

  saffronButtonClick(buttonIconType: any, buttonType: any) {
    if (buttonType === 'Primary icon') {
      this.primaryButtonText = 'You clicked on ' + buttonIconType + ' button';
    } else if (buttonType === 'Secondary icon') {
      this.secondaryButtonText = 'You clicked on ' + buttonIconType + ' button';
    } else if (buttonType === 'Tertiary icon') {
      this.tertiaryButtonText = 'You clicked on ' + buttonIconType + ' button';
    } else if (buttonType === 'Compact') {
      this.compactButtonText = 'You clicked on ' + buttonIconType + ' button';
    } else {
      this.primaryButtonText = '';
      this.secondaryButtonText = '';
      this.tertiaryButtonText = '';
      this.buttonText = '';
    }
  }
}
