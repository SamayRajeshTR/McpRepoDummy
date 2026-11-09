import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-stepper-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-stepper-demo.component.html',
})
export class SafStepperDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'stepper-default', label: 'Default' },
    { id: 'stepper-vertical', label: 'Vertical' },
  ];
}
