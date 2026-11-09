import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-pagination-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-pagination-demo.component.html',
})
export class SafPaginationDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'pagination-default', label: 'Default' },
    { id: 'pagination-compact-pagination', label: 'Compact pagination' },
    { id: 'pagination-custom-items-per-page', label: 'Custom items per page' },
    { id: 'pagination-controlled', label: 'Controlled' },
  ];

  controlled = {
    totalItemCount: 5000,
    currentPageIndex: 1,
    itemsArray: [25, 50, 100, 250, 500],
    itemsPerPage: 500,
  };

  onPrevious = (event: any) => {
    console.log(
      `🚀 ~ SafPaginationDemoComponent ~ previous(currentPageIndex) ~ argument:`,
      event.detail,
    );

    this.controlled.currentPageIndex = event.detail - 1;
  };

  onNext = (event: any) => {
    console.log(
      `🚀 ~ SafPaginationDemoComponent ~ next(currentPageIndex) ~ argument:`,
      event.detail,
    );

    this.controlled.currentPageIndex = event.detail + 1;
  };

  onChange = (event: any) => {
    console.log(
      `🚀 ~ SafPaginationDemoComponent ~ change(nextPageIndex) ~ argument:`,
      event.detail,
    );

    this.controlled.currentPageIndex = event.detail;
  };

  onItemsPerPageChange = (event: any) => {
    console.log(
      `🚀 ~ SafPaginationDemoComponent ~ itemsPerPageChange(nextItemsPerPage) ~ argument:`,
      event.detail,
    );

    this.controlled.itemsPerPage = event.detail;
    this.controlled.currentPageIndex = 1;
  };
}
