import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LinkIconComponent } from 'src/app/link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

interface SideNavDemoItem {
  id: string;
  label: string;
  iconName: string;
  title: string;
}

@Component({
  selector: 'app-saf-side-nav-components',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-side-nav-demo.component.html',
})
export class SafSideNavComponentDemo implements OnDestroy {
  private readonly fullscreenQuery = '(max-width: 767px)';
  private readonly fullscreenFocusDelayMs = 220;
  private readonly genuinePointerMoveThresholdMs = 700;
  private lastGenuinePointerMoveAt = 0;
  private mediaQuery?: MediaQueryList;
  private mediaQueryChangeHandler?: (event: MediaQueryListEvent) => void;

  @ViewChild('pageHeading')
  pageHeadingRef?: ElementRef<HTMLHeadingElement>;

  readonly routerMenuItems: SideNavDemoItem[] = [
    {
      id: 'home',
      label: 'Home',
      iconName: 'house',
      title: 'Home',
    },
    {
      id: 'tools',
      label: 'Tools',
      iconName: 'pen-ruler',
      title: 'Tools',
    },
    {
      id: 'reports',
      label: 'Reports',
      iconName: 'chart-simple',
      title: 'Reports',
    },
    {
      id: 'settings',
      label: 'Settings',
      iconName: 'cog',
      title: 'Settings',
    },
  ];

  inPageLinks: InPageNavigationLink[] = [
    { id: 'side-nav-with-selection', label: 'With side nav selection' },
    { id: 'side-nav-uncontrolled', label: 'Uncontrolled' },
  ];

  // No matching class members: the uncontrolled demo binds nothing, so the component owns its
  // visibility entirely.
  readonly uncontrolledMenuItems: Pick<SideNavDemoItem, 'label' | 'iconName'>[] = [
    { label: 'Home', iconName: 'house' },
    { label: 'Reports', iconName: 'chart-simple' },
    { label: 'Settings', iconName: 'cog' },
  ];

  selectedItemId = this.routerMenuItems[0].id;
  fullscreenSelectionFocus = false;
  private pendingFullscreenHeadingFocus = false;
  private fullscreenHeadingFocusTimeoutId: number | null = null;
  private headingFocusTimeoutId: number | null = null;

  // `fullscreenQuery` mirrors the component's own `fullscreen-breakpoint` default (767px). The demo
  // owns `fullscreen` explicitly, so the component never resolves it - keep the two in step.
  fullscreen = false;
  open = true;

  get currentItem(): SideNavDemoItem {
    return this.routerMenuItems.find((item) => item.id === this.selectedItemId) ?? this.routerMenuItems[0];
  }

  getAriaCurrent(itemId: string): 'page' | null {
    return this.selectedItemId === itemId ? 'page' : null;
  }

  // Any pointermove (mouse, touch, or pen) is a genuine pointer; NVDA's synthetic click produces
  // none, so movement recency separates a real pointer selection from a reading-mode one.
  @HostListener('window:pointermove')
  onWindowPointerMove(): void {
    this.lastGenuinePointerMoveAt = Date.now();
  }

  onSelectItem(itemId: string): void {
    this.selectedItemId = itemId;

    // A genuine mouse click is preceded by real pointer movement; its absence indicates NVDA
    // reading mode. Mouse is left to native behavior; keyboard/NVDA move focus to the heading.
    const isAssistiveSelection =
      Date.now() - this.lastGenuinePointerMoveAt >= this.genuinePointerMoveThresholdMs;

    if (!isAssistiveSelection) {
      return;
    }

    if (this.fullscreen) {
      this.pendingFullscreenHeadingFocus = true;
      return;
    }

    if (this.headingFocusTimeoutId !== null) {
      window.clearTimeout(this.headingFocusTimeoutId);
    }

    this.headingFocusTimeoutId = window.setTimeout(() => {
      this.headingFocusTimeoutId = null;
      this.focusPageHeading();
    });
  }

  // Keyboard (Enter/Space) never emits a click on the menu item, so it is handled separately.
  onItemKeyDown(event: KeyboardEvent, itemId: string): void {
    if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') {
      return;
    }

    this.onSelectItem(itemId);
  }

  onSideNavOpen(): void {
    this.open = true;
  }

  onSideNavClose(): void {
    this.open = false;

    if (!this.fullscreen) {
      // Desktop close cannot consume a pending fullscreen selection; drop it so it can't
      // leak back into a later adaptive dismiss after a breakpoint round-trip.
      this.pendingFullscreenHeadingFocus = false;
      return;
    }

    const shouldMoveFocusToHeading = this.pendingFullscreenHeadingFocus;
    this.pendingFullscreenHeadingFocus = false;

    if (!shouldMoveFocusToHeading) {
      return;
    }

    if (this.fullscreenHeadingFocusTimeoutId !== null) {
      window.clearTimeout(this.fullscreenHeadingFocusTimeoutId);
    }

    this.fullscreenHeadingFocusTimeoutId = window.setTimeout(() => {
      this.fullscreenHeadingFocusTimeoutId = null;
      this.focusPageHeading();
    }, this.fullscreenFocusDelayMs);
  }

  onPageHeadingBlur(): void {
    this.fullscreenSelectionFocus = false;
  }

  // Desktop starts expanded, fullscreen starts closed.
  private syncLayoutMode(isCompactViewport: boolean): void {
    this.fullscreen = isCompactViewport;
    this.open = !isCompactViewport;
  }

  constructor() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    this.mediaQuery = window.matchMedia(this.fullscreenQuery);
    this.syncLayoutMode(this.mediaQuery.matches);

    this.mediaQueryChangeHandler = (event: MediaQueryListEvent) => {
      this.syncLayoutMode(event.matches);
      // A breakpoint crossing abandons any in-flight fullscreen selection; clear the
      // pending focus so it can't steal focus on a later adaptive dismiss.
      this.pendingFullscreenHeadingFocus = false;
    };

    this.mediaQuery.addEventListener('change', this.mediaQueryChangeHandler);
  }

  ngOnDestroy(): void {
    if (this.fullscreenHeadingFocusTimeoutId !== null) {
      window.clearTimeout(this.fullscreenHeadingFocusTimeoutId);
      this.fullscreenHeadingFocusTimeoutId = null;
    }

    if (this.headingFocusTimeoutId !== null) {
      window.clearTimeout(this.headingFocusTimeoutId);
      this.headingFocusTimeoutId = null;
    }

    if (!this.mediaQuery || !this.mediaQueryChangeHandler) {
      return;
    }

    this.mediaQuery.removeEventListener('change', this.mediaQueryChangeHandler);
  }

  private focusPageHeading(): void {
    const heading = this.pageHeadingRef?.nativeElement;
    if (!heading) {
      return;
    }

    // Keyboard and NVDA selections are the only callers, so always show the focus ring.
    this.fullscreenSelectionFocus = true;
    heading.focus();
  }
}
