import {
  Directive,
  EmbeddedViewRef,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Directive that portals its host `<ng-template>` content to `document.body`.
 *
 * This is the Angular equivalent of React's `createPortal(children, document.body)`.
 * Use it to render `saf-dialog` / `saf-drawer` outside ancestor DOM nodes that create
 * a CSS containing block (`position: relative`, `transform`, `overflow: hidden`),
 * which would otherwise break `position: fixed` stacking.
 *
 * Usage:
 * ```html
 * <ng-template appBodyPortal>
 *   <saf-dialog ...></saf-dialog>
 * </ng-template>
 * ```
 *
 * For conditional portals (equivalent to `{condition && createPortal(..., body)}`):
 * ```html
 * @if (condition) {
 *   <ng-template appBodyPortal>
 *     <saf-dialog ...></saf-dialog>
 *   </ng-template>
 * }
 * ```
 *
 * ### Saffron-safe cleanup
 * Saffron components (`saf-drawer`, `saf-dialog`) register `ResizeObserver` callbacks
 * that are cleaned up after the hide animation completes. The component emits a `hide`
 * DOM event once that cleanup is done.
 *
 * This directive avoids premature node removal by branching on visible state:
 * - **Already hidden** → `removeNode()` synchronously. No animation is running, no
 *   ResizeObserver is active, so it is safe to remove immediately.
 * - **Currently visible** → call `.hide()` to start the close animation, then listen
 *   for the `hide` DOM event. Only after the event fires (animation + ResizeObserver
 *   cleanup complete) is the node removed. Fully event-driven — no timers of any kind.
 *
 * All cleanup runs via `NgZone.runOutsideAngular()` so Zone.js neither patches any
 * callbacks nor triggers unnecessary change-detection cycles.
 */
@Directive({
  selector: '[appBodyPortal]',
  standalone: true,
})
export class BodyPortalDirective implements OnInit, OnDestroy {
  private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  /** The embedded view created from the host `<ng-template>`. */
  private viewRef?: EmbeddedViewRef<unknown>;

  /** Root DOM nodes that were appended to `document.body`. */
  private hostedNodes: Node[] = [];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.viewRef.detectChanges();

    // Move root nodes to document.body — equivalent to React's createPortal(…, body)
    this.hostedNodes = [...(this.viewRef.rootNodes as Node[])];
    this.hostedNodes.forEach((node) => document.body.appendChild(node));
  }

  ngOnDestroy(): void {
    const nodes = this.hostedNodes;
    const viewRef = this.viewRef;
    this.hostedNodes = [];
    this.viewRef = undefined;

    if (!viewRef || viewRef.destroyed) {
      return;
    }

    // Track how many nodes still need to be cleaned up.
    // Once all are removed, destroy the embedded view.
    let pending = nodes.filter((n) => n.nodeType === Node.ELEMENT_NODE).length;
    if (pending === 0) {
      viewRef.destroy();
      return;
    }

    const destroyIfDone = () => {
      pending--;
      if (pending === 0 && !viewRef.destroyed) {
        viewRef.destroy();
      }
    };

    // All deferred work runs outside Angular's Zone so Zone.js cannot patch the
    // timers or intercept errors from Saffron's internal cleanup callbacks.
    this.ngZone.runOutsideAngular(() => {
      nodes.forEach((node: any) => {
        if (node?.nodeType !== Node.ELEMENT_NODE) {
          return;
        }

        const removeNode = () => {
          node.parentNode?.removeChild(node);
          destroyIfDone();
        };

        // Saffron v4: `hidden` is a real boolean attribute, so it is present when the
        // element is hidden and removed entirely when it is open. A controlled element
        // exposes a boolean `open`; an uncontrolled one leaves it undefined.
        const isOpen =
          typeof node.open === 'boolean' ? node.open : !node.hasAttribute('hidden');

        if (!isOpen) {
          // Element is already hidden — no animation is running, no ResizeObserver
          // is active. Safe to remove immediately without waiting for any event.
          removeNode();
          return;
        }

        // Element is visible — start the Saffron close sequence and wait for the
        // close lifecycle event, which fires after the animation + ResizeObserver
        // cleanup complete. Fully event-driven: no timer of any kind.
        const onHide = () => {
          node.removeEventListener('saf-dialog-base-closed', onHide);
          removeNode();
        };

        node.addEventListener('saf-dialog-base-closed', onHide);

        try {
          node.hide();
        } catch {
          // hide() threw (e.g. not yet initialised) — remove immediately.
          node.removeEventListener('saf-dialog-base-closed', onHide);
          removeNode();
        }
      });
    });
  }
}
