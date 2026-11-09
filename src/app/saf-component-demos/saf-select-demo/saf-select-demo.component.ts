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
  selector: 'saf-select-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-select-demo.component.html',
})
export class SafSelectDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'select-default', label: 'Default' },
    { id: 'select-disabled', label: 'Disabled' },
    { id: 'select-error', label: 'Error' },
    { id: 'select-open', label: 'Open' },
  ];

  @ViewChild('selectedValue') selectedValue!: ElementRef;
  selectedList = '';

  saffronSelect(): void {
    this.selectedList = this.selectedValue.nativeElement.value;
    console.log(this.selectedList);
  }
}
