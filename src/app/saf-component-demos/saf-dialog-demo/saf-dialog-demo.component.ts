import { DOCUMENT } from '@angular/common';
import { DomPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { AfterViewInit, ApplicationRef, Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, ElementRef, Inject, Injector, OnDestroy, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';
import { BodyPortalDirective } from '../../layout/body-portal/index';

@Component({
  selector: 'saf-dialog-demo',
  imports: [LinkIconComponent, InPageNavigationComponent, BodyPortalDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-dialog-demo.component.html',
  styleUrls: ['./saf-dialog-demo.component.scss'],
})
export class SafDialogDemoComponent implements AfterViewInit, OnDestroy {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'dialog', label: 'Dialog' },
  ];

  isOpen = false;
  isPortalDialogOpen = false;

  private portal?: DomPortal<HTMLElement>;
  private portalOutlet?: DomPortalOutlet;

  @ViewChild('portalDialog')
  private portalDialogRef?: ElementRef<HTMLElement>;

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    // ADO 196731: the dialogs on this page are portaled directly to document.body
    // (see BodyPortalDirective) and their open state is driven only by isOpen /
    // isPortalDialogOpen. Neither Angular's router-outlet teardown nor the portal
    // directive's own cleanup can force-close a *controlled* saf-dialog (its
    // hide() is a no-op while `open` is bound), so navigating away while a dialog
    // is open orphans it, fully open, on top of the next route. Force-close both
    // dialogs as soon as a navigation starts, while this component is still alive
    // and the bindings can still drive the real close.
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (!(event instanceof NavigationStart)) {
        return;
      }
      if (this.isOpen) {
        this.isOpen = false;
      }
      if (this.isPortalDialogOpen) {
        this.isPortalDialogOpen = false;
      }
    });
  }

  ngAfterViewInit() {
    const portalDialog = this.portalDialogRef?.nativeElement;

    if (!portalDialog) {
      return;
    }

    this.portal = new DomPortal(portalDialog);
    this.portalOutlet = new DomPortalOutlet(this.document.body, this.appRef, this.injector);
    this.portalOutlet.attach(this.portal);
  }

  toggleShow() {
    this.isOpen = !this.isOpen;
  }

  hideDialog() {
    this.isOpen = false;
  }

  showPortalDialog() {
    this.isPortalDialogOpen = true;
  }

  hidePortalDialog() {
    this.isPortalDialogOpen = false;
  }

  ngOnDestroy() {
    if (this.portalOutlet?.hasAttached()) {
      this.portalOutlet.detach();
    }
  }
}
