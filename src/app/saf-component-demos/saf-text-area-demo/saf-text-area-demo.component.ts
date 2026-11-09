import { FormsModule } from '@angular/forms';
import {
  Component,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-text-area-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-text-area-demo.component.html',
  styles: ['saf-text-area { width: 500px; }'],
})
export class SafTextAreaDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'text-area-default', label: 'Default' },
    { id: 'text-area-disabled', label: 'Disabled' },
    { id: 'text-area-readonly', label: 'Readonly' },
    { id: 'text-area-required', label: 'Required' },
    { id: 'text-area-compact-text-area', label: 'Compact text area' },
  ];

  @ViewChild('selectedValue') selectedValue!: ElementRef;
  selectedList = '';
  saffronTextarea(): void {
    this.selectedList = this.selectedValue.nativeElement.value;
  }

  @ViewChild('selectedValueRequired') selectedValueRequired!: ElementRef;
  selectedListRequired = '';
  saffronTextareaRequired(): void {
    this.selectedListRequired = this.selectedValueRequired.nativeElement.value;
  }
}
