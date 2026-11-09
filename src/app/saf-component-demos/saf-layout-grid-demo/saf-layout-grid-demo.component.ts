import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-layout-grid-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-layout-grid-demo.component.html',
  styleUrls: ['./saf-layout-grid-demo.component.scss'],
})
export class SafLayoutGridDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'layout-grid-template-1', label: 'Template 1' },
    { id: 'layout-grid-template-2', label: 'Template 2' },
    { id: 'layout-grid-template-3', label: 'Template 3' },
    { id: 'layout-grid-template-4', label: 'Template 4' },
    { id: 'layout-grid-template-5', label: 'Template 5' },
    { id: 'layout-grid-form-example', label: 'Form Example' },
    { id: 'layout-grid-practical-law', label: 'Practical Law' },
  ];

  statusTextOne = '';
  statusTextTwo = '';

  onOpenHandler(option: number) {
    if (option === 1) {
      this.statusTextOne = 'Side Nav opened';
    } else {
      this.statusTextTwo = 'Side Nav opened';
    }
  }
  onCloseHandler(option: number) {
    if (option === 1) {
      this.statusTextOne = 'Side Nav closed';
    } else {
      this.statusTextTwo = 'Side Nav closed';
    }
  }
}
