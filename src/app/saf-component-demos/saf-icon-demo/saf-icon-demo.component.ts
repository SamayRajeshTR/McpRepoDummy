import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-icon-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-icon-demo.component.html',
  styleUrls: ['./saf-icon-demo.component.scss'],
})
export class SafIconDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'iconograph-font-awesome', label: 'Font Awesome' },
  ];
}
