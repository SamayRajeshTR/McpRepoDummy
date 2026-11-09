import {
  Component,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-radio-group-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-radio-group-demo.component.html',
})
export class SafRadioGroupDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'radio-group-vertical', label: 'Vertical' },
    { id: 'radio-group-readonly', label: 'Read-only' },
    { id: 'radio-group-readonly-vertical', label: 'Read-only vertical' },
    { id: 'radio-group-invalid', label: 'Invalid' },
    { id: 'radio-group-radio-button', label: 'Radio button' },
    { id: 'radio-group-radio-button-disabled', label: 'Disabled' },
  ];

  @ViewChild('animalGroup') animalGroup!: ElementRef;

  animals: string[] = ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra'];
  selectedAnimal?: string = '';
  animalSubmitted: boolean = false;
  submittedAnimalValue?: string = '';
  isInvalid: boolean = false;
  validationMessage: string = '';

  handleSelectionChange(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.selectedAnimal = value;
    this.isInvalid = false;
    this.validationMessage = '';
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();

    if (!this.selectedAnimal) {
      this.isInvalid = true;
      this.validationMessage = 'Please select an animal';
      return;
    }

    this.isInvalid = false;
    this.validationMessage = '';
    this.submittedAnimalValue = this.selectedAnimal;
    this.animalSubmitted = true;
    console.log('Animal form submitted with value:', this.selectedAnimal);
  }

  handleFormReset(event: Event) {
    event.preventDefault();

    if (this.animalGroup.nativeElement.selectedRadio) {
      this.animalGroup.nativeElement.selectedRadio.checked = false;
    }

    this.selectedAnimal = '';
    this.animalSubmitted = false;
    this.submittedAnimalValue = '';
    this.isInvalid = false;
    this.validationMessage = '';
  }
}
