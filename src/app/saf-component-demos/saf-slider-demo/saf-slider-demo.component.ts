import { FormsModule } from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-slider-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-slider-demo.component.html',
})
export class SafSliderDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'slider-vertical', label: 'Slider Vertical' },
  ];

  sliderValue = 5;
  temperature = 0;

  onSliderChange(event: Event) {
    this.sliderValue = Number((event.target as HTMLInputElement).value);
  }

  onTemperatureChange(event: Event) {
    this.temperature = Number((event.target as HTMLInputElement).value);
  }
}
