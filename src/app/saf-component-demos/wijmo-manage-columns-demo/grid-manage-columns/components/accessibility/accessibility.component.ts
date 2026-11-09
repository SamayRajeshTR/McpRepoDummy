import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input
} from '@angular/core';
import { defaultInstruction } from './accessibility.utils';

@Component({
  selector: 'app-accessibility',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './accessibility.component.html',
})
export class Accessibility {
  @Input() announce: string = '';
  dndInstructions = defaultInstruction;
}
