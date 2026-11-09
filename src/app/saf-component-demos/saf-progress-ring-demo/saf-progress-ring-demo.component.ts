import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-progress-ring-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-progress-ring-demo.component.html',
  styleUrls: ['./saf-progress-ring-demo.component.scss'],
})
export class SafProgressRingDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'progress-ring', label: 'Progress ring' },
  ];
}
