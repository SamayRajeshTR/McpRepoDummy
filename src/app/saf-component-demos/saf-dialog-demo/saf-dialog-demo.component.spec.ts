import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationStart, provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { SafDialogDemoComponent } from './saf-dialog-demo.component';

@Component({ template: 'other route' })
class OtherRouteTestComponent {}

describe('SafDialogDemoComponent', () => {
  let fixture: ComponentFixture<SafDialogDemoComponent>;
  let component: SafDialogDemoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafDialogDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SafDialogDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should have dialog hidden by default', () => {
    expect(component.isOpen).toBe(false);
  });

  it('should toggle dialog visibility on click', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#dialog-button');
    btn.click();
    expect(component.isOpen).toBe(true);
  });

  it('should have portal dialog hidden by default', () => {
    expect(component.isPortalDialogOpen).toBe(false);
  });

  it('should show portal dialog and move it to document.body', () => {
    component.showPortalDialog();
    expect(component.isPortalDialogOpen).toBe(true);

    const portaledDialog = document.body.querySelector('#portal-dialog-1');
    expect(portaledDialog).not.toBeNull();
  });

  it('should hide portal dialog', () => {
    component.showPortalDialog();
    component.hidePortalDialog();
    expect(component.isPortalDialogOpen).toBe(false);
  });

  it('should force-close both dialogs when a navigation starts (ADO 196731 regression)', () => {
    component.isOpen = true;
    component.showPortalDialog();
    expect(component.isOpen).toBe(true);
    expect(component.isPortalDialogOpen).toBe(true);

    const router = TestBed.inject(Router);
    (router.events as Subject<unknown>).next(new NavigationStart(1, '/some-other-route'));

    expect(component.isOpen).toBe(false);
    expect(component.isPortalDialogOpen).toBe(false);
  });

  it('should leave already-closed dialogs untouched when a navigation starts', () => {
    expect(component.isOpen).toBe(false);
    expect(component.isPortalDialogOpen).toBe(false);

    const router = TestBed.inject(Router);
    (router.events as Subject<unknown>).next(new NavigationStart(1, '/some-other-route'));

    expect(component.isOpen).toBe(false);
    expect(component.isPortalDialogOpen).toBe(false);
  });

  describe('real navigation (ADO 196731)', () => {
    beforeEach(() => {
      // This component's own beforeEach already created a TestBed module; a real
      // router.navigate needs a fresh module with actual routes instead of the
      // provider-less one used by the field-level tests above.
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideRouter([
            { path: 'dialog-demo', component: SafDialogDemoComponent },
            { path: 'other', component: OtherRouteTestComponent },
          ]),
        ],
      });
    });

    it('force-closes both dialogs before a real navigation destroys the source component', async () => {
      const harness = await RouterTestingHarness.create();
      const demoComponent = await harness.navigateByUrl('/dialog-demo', SafDialogDemoComponent);

      // Click the real trigger buttons, same as the existing 'toggle dialog
      // visibility on click' test above -- this runs inside NgZone exactly like
      // a real user click, opening both the default and the body-portaled
      // dialog on this component instance.
      document.querySelector<HTMLElement>('#dialog-button')?.click();
      document.querySelector<HTMLElement>('#portal-dialog-button')?.click();
      expect(demoComponent.isOpen).toBe(true);
      expect(demoComponent.isPortalDialogOpen).toBe(true);

      // Real navigation: resolves asynchronously, runs guards, then destroys
      // SafDialogDemoComponent and swaps in OtherRouteTestComponent -- the exact
      // sequence that orphaned the dialog before this fix (NavigationStart must
      // close it while the source component, and its bindings, are still alive;
      // NavigationEnd would fire too late, after destruction). demoComponent
      // remains a valid object reference after destruction, so its fields can
      // still be read to prove what happened to it during the real navigation
      // that just destroyed it -- this is not a mocked router.events push.
      await harness.navigateByUrl('/other');

      expect(demoComponent.isOpen).toBe(false);
      expect(demoComponent.isPortalDialogOpen).toBe(false);
    });
  });
});
