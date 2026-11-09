import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {
  allNavigationItems,
  findNavigationItemByPath,
  navigationData,
  NavigationCategoryGroup,
  NavigationItem,
} from '../navigation-data';
import { SearchOverlayComponent } from '../search-overlay/search-overlay.component';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [RouterOutlet, SearchOverlayComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sideNavRef') sideNavRef?: ElementRef;

  sideNavState: 'open' | 'closed' = 'open';
  searchOverlayOpen = false;
  isFullscreenMode = false;
  previousPath = '';

  currentItem: NavigationItem | undefined;

  readonly navigationData: NavigationCategoryGroup[] = navigationData;
  readonly allNavigationItems: NavigationItem[] = allNavigationItems;
  readonly themeService = inject(ThemeService);

  private routerSub?: Subscription;
  private mediaQuery?: MediaQueryList;
  private mediaQueryHandler?: (e: MediaQueryListEvent) => void;
  private escapeKeydownHandler?: (e: KeyboardEvent) => void;
  private lastEscapeTime = 0;

  constructor(readonly router: Router) {}

  ngOnInit(): void {
    // Set initial current item
    this.currentItem = findNavigationItemByPath(this.cleanUrl(this.router.url));

    // Router events: update current item, handle mobile auto-close
    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const url = this.cleanUrl(e.urlAfterRedirects);
        this.currentItem = findNavigationItemByPath(url);
        if (this.isFullscreenMode && url !== this.previousPath) {
          this.sideNavState = 'closed';
        }
        this.previousPath = url;
      });

    // Mobile breakpoint (≤767px)
    this.mediaQuery = window.matchMedia('(max-width: 767px)');
    this.mediaQueryHandler = (e: MediaQueryListEvent) => {
      this.isFullscreenMode = e.matches;
      this.sideNavState = e.matches ? 'closed' : 'open';
    };
    this.isFullscreenMode = this.mediaQuery.matches;
    this.sideNavState = this.mediaQuery.matches ? 'closed' : 'open';
    this.mediaQuery.addEventListener('change', this.mediaQueryHandler);

    // Track ESC key presses by timestamp so we can distinguish
    // ESC-triggered close from user-initiated close (click) in handleSideNavClose.
    // No stopPropagation — all other components receive ESC normally.
    this.escapeKeydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.lastEscapeTime = Date.now();
        if (this.searchOverlayOpen) {
          this.searchOverlayOpen = false;
        }
      }
    };
    document.addEventListener('keydown', this.escapeKeydownHandler, true);
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    if (this.mediaQuery && this.mediaQueryHandler) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryHandler);
    }
    if (this.escapeKeydownHandler) {
      document.removeEventListener('keydown', this.escapeKeydownHandler, true);
    }
  }

  // Ctrl/Cmd+K → open search
  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.searchOverlayOpen = true;
    }
  }

  handleSideNavOpen(): void {
    this.sideNavState = 'open';
  }

  handleSideNavClose(): void {
    // If the close was triggered by ESC (within 500ms), force the side-nav
    // back to 'open'. This only affects THIS main-layout side-nav — other
    // components (dialogs, drawers, menus, demo side-navs) are unaffected.
    if (Date.now() - this.lastEscapeTime < 500) {
      // `state` is read-only in v4 and the component overwrites any manual write, so reopening is
      // driven purely through the [attr.open] binding below.
      this.sideNavState = 'open';
      return;
    }
    this.sideNavState = 'closed';
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  navigateHome(): void {
    this.router.navigate(['/password-generator']);
  }

  isActive(path: string): boolean {
    return this.cleanUrl(this.router.url) === path;
  }

  getCategoryLabel(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  }

  isLastCategory(group: NavigationCategoryGroup): boolean {
    return group === this.navigationData[this.navigationData.length - 1];
  }

  private cleanUrl(url: string): string {
    return url.split('?')[0].split('#')[0];
  }
}
