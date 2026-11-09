import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { allNavigationItems, NavigationItem } from '../navigation-data';

type BadgeAppearance = 'success' | 'error' | 'warning' | 'info' | 'neutral';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchOverlayComponent implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Output() closeOverlay = new EventEmitter<void>();

  @ViewChild('dialogRef') dialogRef?: ElementRef<HTMLElement & { show(): void; hide(): void }>;
  @ViewChild('searchFieldRef') searchFieldRef?: ElementRef<HTMLElement & { focus(): void; value: string }>;

  searchQuery = '';
  searchResults: NavigationItem[] = [];
  selectedIndex = 0;

  readonly popularSearches = ['Button', 'Search Field', 'Dialog', 'Table', 'Getting Started', 'Tokens'];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
        // Focus search field after dialog renders
        setTimeout(() => {
          this.searchFieldRef?.nativeElement.focus();
        }, 100);
      } else {
        document.body.style.overflow = '';
        this.resetSearch();
      }
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (this.selectedIndex < this.searchResults.length - 1) {
          this.selectedIndex++;
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (this.searchResults[this.selectedIndex]) {
          this.selectItem(this.searchResults[this.selectedIndex]);
        }
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  onInput(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.filterResults();
  }

  onClear(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.selectedIndex = 0;
  }

  onPopularSearch(term: string): void {
    this.searchQuery = term;
    this.filterResults();
  }

  selectItem(item: NavigationItem): void {
    this.router.navigate([item.path]);
    this.close();
    this.resetSearch();
  }

  setSelectedIndex(index: number): void {
    this.selectedIndex = index;
  }

  close(): void {
    this.closeOverlay.emit();
  }

  getCategoryDisplayName(category: string): string {
    const map: Record<string, string> = {
      'getting-started': 'Getting Started',
      components: 'Components',
      resources: 'Resources',
      patterns: 'Patterns',
      preview: 'Preview',
    };
    return map[category] ?? (category.charAt(0).toUpperCase() + category.slice(1));
  }

  getCategoryColor(category: string): BadgeAppearance {
    const map: Record<string, BadgeAppearance> = {
      'getting-started': 'success',
      components: 'info',
      resources: 'warning',
      patterns: 'error',
      preview: 'neutral',
    };
    return map[category] ?? 'neutral';
  }

  private filterResults(): void {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      this.selectedIndex = 0;
      return;
    }
    const q = this.searchQuery.toLowerCase();
    this.searchResults = allNavigationItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q),
    );
    this.selectedIndex = 0;
  }

  private resetSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.selectedIndex = 0;
  }
}
