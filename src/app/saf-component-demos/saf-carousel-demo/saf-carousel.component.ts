import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-carousel-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-carousel.component.html',
})
export class SafCarouselDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'carousel-single', label: 'Single' },
    { id: 'carousel-multiple', label: 'Multiple' },
  ];
}
