import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SafSideNavComponentDemo } from './saf-side-nav-component';

const mockMatchMedia = (matches: boolean): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jasmine.createSpy('matchMedia').and.callFake((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    })),
  });
};

 describe('Should load the Side nav Demo component', () => {
  let component: SafSideNavComponentDemo;
  let fixture: ComponentFixture<SafSideNavComponentDemo>;

  beforeEach(() => {
    mockMatchMedia(false);

    TestBed.configureTestingModule({
      imports: [SafSideNavComponentDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SafSideNavComponentDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('Should create the side nav app', () => {
    expect(component).toBeDefined();
  });

  it('should render the side nav selection heading', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#side-nav-with-selection')).toBeTruthy();
    expect(compiled.textContent).toContain('With side nav selection');
    expect(compiled.textContent).toContain('Menu');
  });

  it('should render the uncontrolled demo section', () => {
    const compiled = fixture.debugElement.nativeElement;
    const uncontrolledNav = compiled.querySelector('#uncontrolled-side-nav') as HTMLElement;

    expect(compiled.querySelector('#side-nav-uncontrolled')).toBeTruthy();
    expect(uncontrolledNav).toBeTruthy();
    expect(uncontrolledNav.querySelectorAll('saf-menu-item').length).toBe(3);
  });

  // Binding open at all, even to false, would activate the component's isControlled gate and stop
  // it managing its own visibility.
  it('should leave the uncontrolled nav entirely to the component', () => {
    const uncontrolledNav = fixture.debugElement.nativeElement.querySelector(
      '#uncontrolled-side-nav',
    ) as HTMLElement;

    expect(uncontrolledNav.hasAttribute('open')).toBe(false);
    expect(uncontrolledNav.hasAttribute('default-open')).toBe(true);
  });

  it('should wire the external trigger to the uncontrolled nav via trigger-id', () => {
    const compiled = fixture.debugElement.nativeElement;
    const uncontrolledNav = compiled.querySelector('#uncontrolled-side-nav') as HTMLElement;
    const trigger = compiled.querySelector('#uncontrolled-side-nav-trigger') as HTMLElement;

    expect(trigger).toBeTruthy();
    expect(uncontrolledNav.getAttribute('trigger-id')).toBe('uncontrolled-side-nav-trigger');
    expect(trigger.textContent).toContain('Expand side navigation');
    expect(trigger.querySelector('saf-icon')).toBeTruthy();
    expect(compiled.textContent).toContain('Use the toggle to expand side nav');
  });

  it('should default Home as current item', () => {
    expect(component.currentItem.title).toBe('Home');
    expect(component.selectedItemId).toBe('home');
  });

  it('should default side nav state to open on desktop', () => {
    expect(component.open).toBe(true);
  });

  it('should default side nav state to closed on fullscreen viewports', () => {
    mockMatchMedia(true);
    const fullscreenFixture = TestBed.createComponent(SafSideNavComponentDemo);
    const fullscreenComponent = fullscreenFixture.componentInstance;
    fullscreenFixture.detectChanges();

    expect(fullscreenComponent.open).toBe(false);

    fullscreenFixture.destroy();
  });

  // The nav is controlled in both layouts, so the hamburger must drive `open` directly. Flipping
  // between controlled and uncontrolled at runtime made show() no-op against a stale `open`, and
  // the nav only opened on the second tap.
  it('should open the fullscreen nav on the first hamburger tap', () => {
    mockMatchMedia(true);
    const fullscreenFixture = TestBed.createComponent(SafSideNavComponentDemo);
    const fullscreenComponent = fullscreenFixture.componentInstance;
    fullscreenFixture.detectChanges();

    expect(fullscreenComponent.open).toBe(false);

    fullscreenComponent.onSideNavOpen();

    expect(fullscreenComponent.open).toBe(true);

    fullscreenFixture.destroy();
  });

  it('should close the fullscreen nav when the component requests a close', () => {
    mockMatchMedia(true);
    const fullscreenFixture = TestBed.createComponent(SafSideNavComponentDemo);
    const fullscreenComponent = fullscreenFixture.componentInstance;
    fullscreenFixture.detectChanges();

    fullscreenComponent.onSideNavOpen();
    expect(fullscreenComponent.open).toBe(true);

    fullscreenComponent.onSideNavClose();

    expect(fullscreenComponent.open).toBe(false);

    fullscreenFixture.destroy();
  });

  it('should change the current item and mark aria-current when a menu item is clicked', () => {
    const items = Array.from(
      fixture.nativeElement.querySelectorAll('saf-menu-item'),
    ) as HTMLElement[];
    const reports = items.find((el) => el.textContent?.includes('Reports'));
    expect(reports).toBeTruthy();

    reports!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.selectedItemId).toBe('reports');
    expect(component.currentItem.title).toBe('Reports');
    expect(reports!.getAttribute('aria-current')).toBe('page');
  });

  it('should move focus to heading after desktop selection', fakeAsync(() => {
    const heading = fixture.nativeElement.querySelector('.router-demo-page-heading') as HTMLHeadingElement;

    component.onSelectItem('reports');
    tick(250);

    expect(document.activeElement).toBe(heading);
  }));

  it('should move focus to heading after fullscreen selection and close', fakeAsync(() => {
    component.fullscreen = true;

    const heading = fixture.nativeElement.querySelector('.router-demo-page-heading') as HTMLHeadingElement;
    expect(document.activeElement).not.toBe(heading);

    component.onSelectItem('reports');
    component.onSideNavClose();

    tick(220);
    expect(document.activeElement).toBe(heading);
  }));

  it('should not move focus to heading when fullscreen nav closes without selection', fakeAsync(() => {
    component.fullscreen = true;

    const heading = fixture.nativeElement.querySelector('.router-demo-page-heading') as HTMLHeadingElement;
    expect(document.activeElement).not.toBe(heading);

    component.onSideNavClose();
    tick(220);

    expect(document.activeElement).not.toBe(heading);
  }));

  it('should select and mark aria-current on the menu item when Enter is pressed on it', () => {
    const items = Array.from(
      fixture.nativeElement.querySelectorAll('saf-menu-item'),
    ) as HTMLElement[];
    const reports = items.find((el) => el.textContent?.includes('Reports'));
    expect(reports).toBeTruthy();

    reports!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect(component.selectedItemId).toBe('reports');
    expect(reports!.getAttribute('aria-current')).toBe('page');
  });

  it('should not select the menu item when a non-activation key is pressed on it', () => {
    const items = Array.from(
      fixture.nativeElement.querySelectorAll('saf-menu-item'),
    ) as HTMLElement[];
    const reports = items.find((el) => el.textContent?.includes('Reports'));
    expect(reports).toBeTruthy();

    reports!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fixture.detectChanges();

    expect(component.selectedItemId).toBe('home');
    expect(reports!.getAttribute('aria-current')).toBeNull();
  });

  it('should compute aria-current for selected and non-selected items', () => {
    component.selectedItemId = 'settings';
    expect(component.getAriaCurrent('settings')).toBe('page');
    expect(component.getAriaCurrent('home')).toBeNull();
  });

  it('should not show visible heading focus after a genuine mouse selection', fakeAsync(() => {
    component.onWindowPointerMove();
    component.onSelectItem('reports');
    tick(250);

    expect(component.fullscreenSelectionFocus).toBeFalse();
  }));

  it('should show visible heading focus for keyboard or screen reader selection', fakeAsync(() => {
    // No genuine pointermove, so the selection is treated as keyboard/AT (e.g. NVDA).
    component.onSelectItem('reports');
    tick(250);

    expect(component.fullscreenSelectionFocus).toBeTrue();
  }));

  it('should not show visible heading focus after a genuine mouse fullscreen selection', fakeAsync(() => {
    component.fullscreen = true;
    component.onWindowPointerMove();
    component.onSelectItem('reports');
    component.onSideNavClose();
    tick(220);

    expect(component.fullscreenSelectionFocus).toBeFalse();
  }));

  it('should show visible heading focus after a keyboard or screen reader fullscreen selection', fakeAsync(() => {
    component.fullscreen = true;
    component.onSelectItem('reports');
    component.onSideNavClose();
    tick(220);

    expect(component.fullscreenSelectionFocus).toBeTrue();
  }));

  it('should not steal focus to heading on adaptive dismiss after a breakpoint round-trip', fakeAsync(() => {
    // Select on mobile, then cross the breakpoint before the close fires.
    component.fullscreen = true;
    component.onSelectItem('reports');
    component['mediaQueryChangeHandler']?.({ matches: false } as MediaQueryListEvent);
    component['mediaQueryChangeHandler']?.({ matches: true } as MediaQueryListEvent);

    const heading = fixture.nativeElement.querySelector('.router-demo-page-heading') as HTMLHeadingElement;

    // Dismiss without selecting; stale pending focus must not move focus to the heading.
    component.onSideNavClose();
    tick(220);

    expect(document.activeElement).not.toBe(heading);
  }));

  it('should treat a mouse click after a stale (>700ms) pointer move as assistive', fakeAsync(() => {
    component['lastGenuinePointerMoveAt'] = Date.now() - 800;
    component.onSelectItem('reports');
    tick(250);

    expect(component.fullscreenSelectionFocus).toBeTrue();
  }));

  it('should select the menu item on a real Space keydown', () => {
    const items = Array.from(
      fixture.nativeElement.querySelectorAll('saf-menu-item'),
    ) as HTMLElement[];
    const reports = items.find((el) => el.textContent?.includes('Reports'));
    expect(reports).toBeTruthy();

    reports!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();

    expect(component.selectedItemId).toBe('reports');
  });

  it('should move focus to the heading with a visible ring on a real Enter keydown', fakeAsync(() => {
    const items = Array.from(
      fixture.nativeElement.querySelectorAll('saf-menu-item'),
    ) as HTMLElement[];
    const reports = items.find((el) => el.textContent?.includes('Reports'));
    const heading = fixture.nativeElement.querySelector(
      '.router-demo-page-heading',
    ) as HTMLHeadingElement;

    reports!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    tick(250);

    expect(document.activeElement).toBe(heading);
    expect(component.fullscreenSelectionFocus).toBeTrue();
  }));

  it('should clear the visible ring flag when the page heading blurs', () => {
    component.fullscreenSelectionFocus = true;
    component.onPageHeadingBlur();

    expect(component.fullscreenSelectionFocus).toBeFalse();
  });

});



