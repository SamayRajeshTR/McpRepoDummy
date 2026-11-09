import { FormsModule } from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';

import { SafA11y } from '@saffron/core-components';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

const defaultCategory = 'All genres';

const movies = [
  { title: 'Die Hard', category: 'Action', id: 1 },
  { title: 'Mad Max: Fury Road', category: 'Action', id: 2 },
  { title: 'John Wick', category: 'Action', id: 3 },
  { title: 'The Dark Knight', category: 'Action', id: 4 },
  { title: 'Inception', category: 'Sci-Fi', id: 5 },
  { title: 'Interstellar', category: 'Sci-Fi', id: 6 },
  { title: 'Blade Runner 2049', category: 'Sci-Fi', id: 7 },
  { title: 'The Matrix', category: 'Sci-Fi', id: 8 },
  { title: 'The Godfather', category: 'Drama', id: 9 },
  { title: "Schindler's List", category: 'Drama', id: 10 },
  { title: 'Forrest Gump', category: 'Drama', id: 11 },
  { title: 'The Shawshank Redemption', category: 'Drama', id: 12 },
  { title: 'Superbad', category: 'Comedy', id: 13 },
  { title: 'The Grand Budapest Hotel', category: 'Comedy', id: 14 },
  { title: 'Monty Python and the Holy Grail', category: 'Comedy', id: 15 },
  { title: 'Groundhog Day', category: 'Comedy', id: 16 },
  { title: 'Arrival', category: 'Sci-Fi', id: 17 },
  { title: 'Gladiator', category: 'Action', id: 18 },
  { title: 'Parasite', category: 'Drama', id: 19 },
  { title: 'The Hangover', category: 'Comedy', id: 20 },
];

@Component({
  selector: 'saf-search-field-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-search-field-demo.component.html',
})
export class SafSearchFieldDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'search-field-default', label: 'Default' },
    { id: 'search-field-compact-search-field', label: 'Compact search field' },
    { id: 'search-field-with-pre-filter', label: 'With pre-filter' },
  ];

  search = '';
  searchResults = <(typeof movies)[number][]>[];
  filter = defaultCategory;
  categories = [defaultCategory, ...new Set(movies.map((i) => i.category))];
  isClear = false;
  isFilter = false;

  filterResults() {
    this.searchResults = movies
      .filter((movie) =>
        movie.title.toLowerCase().includes(this.search.toLowerCase()),
      )
      .filter((movie) => {
        if (this.filter === defaultCategory) return movie;

        return movie.category === this.filter;
      });
  }

  handleFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
    this.isFilter = true;
    this.filterResults();
    this.announceResults();
    this.isFilter = false;
  }

  handleSearch(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.filterResults();
    this.announceResults();
  }
  handleClear() {
    this.isClear = true;
    this.search = '';
    this.searchResults = [];
    this.announceResults();
    this.filter = defaultCategory;
    this.isClear = false;
  }
  announceResults() {
    if (this.searchResults.length === 0 && this.search && !this.isClear) {
      SafA11y.announce(`No results found`);
    } else if (
      this.searchResults.length > 0 &&
      !this.isFilter &&
      !this.isClear
    ) {
      SafA11y.announce(`Search results listed below`);
    } else if (
      this.searchResults.length > 0 &&
      this.isFilter &&
      !this.isClear
    ) {
      SafA11y.announce(`Search results updated`);
    } else if (this.isClear) {
      SafA11y.announce(`Search cleared`);
    }
  }
}
