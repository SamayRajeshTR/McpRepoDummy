import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-ready-to-use-components',
  templateUrl: './ready-to-use-components.component.html',
  styles: ['.PageDivider { border-width: 1px; margin: 64px 0; }'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReadyToUseComponent {}
