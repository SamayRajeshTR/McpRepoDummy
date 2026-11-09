import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-faceted-filter-demo',
  imports: [DragDropModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-faceted-filter.component.html',
  styleUrls: ['./saf-faceted-filter.styles.scss'],
})
export class SafFacetedFilterDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'faceted-filter-default', label: 'Default' },
    { id: 'faceted-filter-with-counter', label: 'With counter' },
  ];

  items = [
    {
      id: 'first-vegetable',
      name: 'Olive Oil',
      count: '11',
    },
    {
      id: 'second-vegetable',
      name: 'Sunflower Oil',
      count: '4',
    },
    {
      id: 'third-vegetable',
      name: 'Avocado Oil',
      count: '8',
    },
  ];
}
