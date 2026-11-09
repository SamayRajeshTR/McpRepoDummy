import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-documentation-study',
  templateUrl: './documentation-study.component.html',
  styleUrls: ['./documentation-study.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DocumentationStudy {
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
