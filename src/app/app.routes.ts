import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { TokenDemo } from './token-demo/token-demo.component';
import { TokenStudy } from './token-study/token-study.component';
import { DocumentationStudy } from './documentation-study/documentation-study.component';
import { SafAccordionDemoComponent } from './saf-component-demos/saf-accordion-demo/saf-accordion-demo.component';
import { SafActionCardDemoComponent } from './saf-component-demos/saf-action-card-demo/saf-action-card-demo.component';
import { SafActivityDemoComponent } from './saf-component-demos/saf-activity-demo/saf-activity-demo.component';
import { SafAlertDemoComponent } from './saf-component-demos/saf-alert-demo/saf-alert-demo.component';
import { SafAnchorDemoComponent } from './saf-component-demos/saf-anchor-demo/saf-anchor-demo.component';
import { SafAvatarDemoComponent } from './saf-component-demos/saf-avatar-demo/saf-avatar-demo.component';
import { SafBackToTopDemoComponent } from './saf-component-demos/saf-back-to-top-demo/saf-back-to-top-demo.component';
import { SafBadgeDemoComponent } from './saf-component-demos/saf-badge-demo/saf-badge-demo.component';
import { SafBreadcrumbDemoComponent } from './saf-component-demos/saf-breadcrumb-demo/saf-breadcrumb-demo.component';
import { SafButtonDemoComponent } from './saf-component-demos/saf-button-demo/saf-button-demo.component';
import { SafButtonGroupDemoComponent } from './saf-component-demos/saf-button-group-demo/saf-button-group-demo.component';
import { SafCardDemoComponent } from './saf-component-demos/saf-card-demo/saf-card-demo.component';
import { SafCarouselDemoComponent } from './saf-component-demos/saf-carousel-demo/saf-carousel.component';
import { SafChipDemoComponent } from './saf-component-demos/saf-chip-demo/saf-chip-demo.component';
import { SafCheckboxDemoComponent } from './saf-component-demos/saf-checkbox-demo/saf-checkbox-demo.component';
import { SafCheckboxGroupDemoComponent } from './saf-component-demos/saf-checkbox-group-demo/saf-checkbox-group-demo.component';
import { SafComboboxDemoComponent } from './saf-component-demos/saf-combobox-demo/saf-combobox-demo.component';
import { SafCommentFieldDemoComponent } from './saf-component-demos/saf-comment-field-demo/saf-comment-field-demo.component';
import { SafDatepickerDemoComponent } from './saf-component-demos/saf-datepicker-demo/saf-datepicker-demo.component';
import { SafDialogDemoComponent } from './saf-component-demos/saf-dialog-demo/saf-dialog-demo.component';
import { SafDisclosureDemoComponent } from './saf-component-demos/saf-disclosure-demo/saf-disclosure-demo.component';
import { SafDividerDemoComponent } from './saf-component-demos/saf-divider-demo/saf-divider-demo.component';
import { SafDrawerDemoComponent } from './saf-component-demos/saf-drawer-demo/saf-drawer-demo.component';
import { SafFooterDemoComponent } from './saf-component-demos/saf-footer-demo/saf-footer-demo.component';
import { SafIconDemoComponent } from './saf-component-demos/saf-icon-demo/saf-icon-demo.component';
import { SafListboxDemoComponent } from './saf-component-demos/saf-listbox-demo/saf-listbox-demo.component';
import { SafListDemoComponent } from './saf-component-demos/saf-list-demo/saf-list-demo.component';
import { SafOptionDemoComponent } from './saf-component-demos/saf-option-demo/saf-option-demo.component';
import { SafLogoDemoComponent } from './saf-component-demos/saf-logo-demo/saf-logo-demo.component';
import { SafMenuDemoComponent } from './saf-component-demos/saf-menu-demo/saf-menu-demo.component';
import { SafNumberFieldDemoComponent } from './saf-component-demos/saf-number-field-demo/saf-number-field-demo.component';
import { SafProductHeaderDemoComponent } from './saf-component-demos/saf-product-header-demo/saf-product-header-demo.component';
import { SafProgressDemoComponent } from './saf-component-demos/saf-progress-demo/saf-progress-demo.component';
import { SafRadioGroupDemoComponent } from './saf-component-demos/saf-radio-group-demo/saf-radio-group-demo.component';
import { SafSearchFieldDemoComponent } from './saf-component-demos/saf-search-field-demo/saf-search-field-demo.component';
import { SafSelectDemoComponent } from './saf-component-demos/saf-select-demo/saf-select-demo.component';
import { SafSideNavComponentDemo } from './saf-component-demos/saf-side-nav-demo/saf-side-nav-component';
import { SafSliderDemoComponent } from './saf-component-demos/saf-slider-demo/saf-slider-demo.component';
import { SafSwitchDemoComponent } from './saf-component-demos/saf-switch-demo/saf-switch-demo.component';
import { SafTabsDemoComponent } from './saf-component-demos/saf-tabs-demo/saf-tabs-demo.component';
import { SafTextAreaDemoComponent } from './saf-component-demos/saf-text-area-demo/saf-text-area-demo.component';
import { SafTextFieldDemoComponent } from './saf-component-demos/saf-text-field-demo/saf-text-field-demo.component';
import { SafThemeProviderDemoComponent } from './saf-component-demos/saf-theme-provider-demo/saf-theme-provider-demo.component';
import { SafThemeProviderPreviewComponent } from './saf-component-demos/saf-theme-provider-preview/saf-theme-provider-preview.component';
import { SafTooltipDemoComponent } from './saf-component-demos/saf-tooltip-demo/saf-tooltip-demo.component';
import { WijmoManageColumnsDemoComponent } from './saf-component-demos/wijmo-manage-columns-demo/wijmo-demo.component';
import { SafBasicFormComponent } from './saf-component-demos/basic-form-component/basic-form.component';
import { SafEmptyStateDemoComponent } from './saf-component-demos/saf-empty-state-demo/saf-empty-state-demo.component';
import { SafTreeViewDemoComponent } from './saf-component-demos/saf-tree-view-demo/saf-tree-view-demo.component';
import { SafChatDemoComponent } from './saf-component-demos/saf-chat-demo/saf-chat-demo.component';
import { SafButtonEmbeddedDemoComponent } from './saf-component-demos/saf-button-embedded-demo/saf-button-embedded-demo.component';
import { SafMessageBoxDemoComponent } from './saf-component-demos/saf-message-box/saf-message-box-demo.component';
import { SafMetadataDemoComponent } from './saf-component-demos/saf-metadata-demo/saf-metadata-demo.component';
import { SafPaginationDemoComponent } from './saf-component-demos/saf-pagination-demo/saf-pagination-demo.component';
import { SafProgressRingDemoComponent } from './saf-component-demos/saf-progress-ring-demo/saf-progress-ring-demo.component';
import { SafProgressTextDemoComponent } from './saf-component-demos/saf-progress-text/saf-progress-text-demo.component';
import { SafAIPromptDemoComponent } from './saf-component-demos/saf-a-i-prompt-demo/saf-a-i-prompt-demo.component';
import { SafSplitterDemoComponent } from './saf-component-demos/saf-splitter-demo/saf-splitter-demo.component';
import { SafToolbarDemoComponent } from './saf-component-demos/saf-toolbar-demo/saf-toolbar-demo.component';
import { SafWindowsDemoComponent } from './saf-component-demos/saf-windows-demo/saf-windows-demo.component';
import { SafFacetedFilterDemoComponent } from './saf-component-demos/saf-faceted-filter-demo/saf-faceted-filter.component';
import { SafFileUploadDemoComponent } from './saf-component-demos/saf-file-upload-demo/saf-file-upload.component';
import { SafFileUploadProgressPanelDemoComponent } from './saf-component-demos/saf-file-upload-progress-panel-demo/saf-file-upload-progress-panel.component';
import { SafFileUploadStatusItemDemoComponent } from './saf-component-demos/saf-file-upload-status-item-demo/saf-file-upload-status-item.component';
import { SafStepperDemoComponent } from './saf-component-demos/saf-stepper-demo/saf-stepper-demo.component';
import { SafStatusDemoComponent } from './saf-component-demos/saf-status-demo/saf-status-demo.component';
import { SafTextDemoComponent } from './saf-component-demos/saf-text-demo/saf-text-demo.component';
import { SafWorkspaceDemoComponent } from './saf-component-demos/saf-workspace-pattern-demo/saf-workspace-pattern-demo.component';
import { ButtonDialogDemoComponent } from './saf-component-demos/button-dialog/button-dialog-demo.component';
import { ButtonMenuDemoComponent } from './saf-component-demos/button-menu/button-menu-demo.component';
import { SafTableDemoComponent } from './saf-component-demos/saf-table-demo/saf-table-demo.component';
import { SafWizardDemoComponent } from './saf-component-demos/saf-wizard-demo/saf-wizard-demo.component';
import { WijmoDemoComponent } from './saf-component-demos/wijmo-demo/wijmo-demo.component';
import { SafLayoutGridDemoComponent } from './saf-component-demos/saf-layout-grid-demo/saf-layout-grid-demo.component';
import { SafSkipLinkDemoComponent } from './saf-component-demos/saf-skip-link-demo/saf-skip-link-demo.component';
import { SafSkipLinkGroupDemoComponent } from './saf-component-demos/saf-skip-link-group-demo/saf-skip-link-group-demo.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'theme-provider-preview',
    component: SafThemeProviderDemoComponent,
    title: 'Theme Provider demo',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Landing page
  {
    path: 'getting-started',
    component: GettingStartedComponent,
    title: 'Getting started',
  },

  // Ready to use components
  {
    path: 'accordion',
    component: SafAccordionDemoComponent,
    title: 'Accordion demo',
  },
  {
    path: 'action-card',
    component: SafActionCardDemoComponent,
    title: 'Action card demo',
  },
  {
    path: 'activity',
    component: SafActivityDemoComponent,
    title: 'Activity demo',
  },
  {
    path: 'chat',
    component: SafChatDemoComponent,
    title: 'Chat demo',
  },
  { path: 'alert', component: SafAlertDemoComponent, title: 'Alert demo' },
  { path: 'anchor', component: SafAnchorDemoComponent, title: 'Anchor demo' },
  { path: 'avatar', component: SafAvatarDemoComponent, title: 'Avatar demo' },
  {
    path: 'back-to-top',
    component: SafBackToTopDemoComponent,
    title: 'Back to top demo',
  },
  { path: 'badge', component: SafBadgeDemoComponent, title: 'Badge demo' },
  {
    path: 'breadcrumb',
    component: SafBreadcrumbDemoComponent,
    title: 'Breadcrumb demo',
  },
  { path: 'button', component: SafButtonDemoComponent, title: 'Button demo' },
  {
    path: 'button-embedded',
    component: SafButtonEmbeddedDemoComponent,
    title: 'Button embedded demo',
  },
  {
    path: 'button-group',
    component: SafButtonGroupDemoComponent,
    title: 'Button group demo',
  },
  { path: 'card', component: SafCardDemoComponent, title: 'Card demo' },
  { path: 'chip', component: SafChipDemoComponent, title: 'Chip demo' },
  {
    path: 'checkbox',
    component: SafCheckboxDemoComponent,
    title: 'Checkbox demo',
  },
  {
    path: 'checkbox-group',
    component: SafCheckboxGroupDemoComponent,
    title: 'Checkbox group demo',
  },
  {
    path: 'combobox',
    component: SafComboboxDemoComponent,
    title: 'Combobox demo',
  },
  {
    path: 'datepicker',
    component: SafDatepickerDemoComponent,
    title: 'Datepicker demo',
  },
  { path: 'dialog', component: SafDialogDemoComponent, title: 'Dialog demo' },
  {
    path: 'button-and-dialog',
    component: ButtonDialogDemoComponent,
    title: 'Button and dialog demo',
  },
  {
    path: 'disclosure',
    component: SafDisclosureDemoComponent,
    title: 'Disclosure demo',
  },
  {
    path: 'divider',
    component: SafDividerDemoComponent,
    title: 'Divider demo',
  },
  { path: 'drawer', component: SafDrawerDemoComponent, title: 'Drawer demo' },
  {
    path: 'faceted-filter',
    component: SafFacetedFilterDemoComponent,
    title: 'Faceted filter demo',
  },
  {
    path: 'file-upload',
    component: SafFileUploadDemoComponent,
    title: 'File upload demo',
  },
  {
    path: 'file-upload-progress-panel',
    component: SafFileUploadProgressPanelDemoComponent,
    title: 'File upload progress panel demo',
  },
  {
    path: 'file-upload-status-item',
    component: SafFileUploadStatusItemDemoComponent,
    title: 'File upload status item demo',
  },
  {
    path: 'icon',
    component: SafIconDemoComponent,
    title: 'Icon demo',
  },
  {
    path: 'listbox',
    component: SafListboxDemoComponent,
    title: 'Listbox demo',
  },
  {
    path: 'option',
    component: SafOptionDemoComponent,
    title: 'Option demo',
  },
  {
    path: 'list',
    component: SafListDemoComponent,
    title: 'List demo',
  },
  { path: 'logo', component: SafLogoDemoComponent, title: 'Logo demo' },
  { path: 'menu', component: SafMenuDemoComponent, title: 'Menu demo' },
  {
    path: 'button-and-menu',
    component: ButtonMenuDemoComponent,
    title: 'Button and menu demo',
  },
  {
    path: 'message-box',
    component: SafMessageBoxDemoComponent,
    title: 'Message box demo',
  },
  {
    path: 'metadata',
    component: SafMetadataDemoComponent,
    title: 'Metadata demo',
  },
  {
    path: 'number-field',
    component: SafNumberFieldDemoComponent,
    title: 'Number field demo',
  },
  {
    path: 'pagination',
    component: SafPaginationDemoComponent,
    title: 'Pagination demo',
  },
  {
    path: 'product-header',
    component: SafProductHeaderDemoComponent,
    title: 'Product header demo',
  },
  {
    path: 'progress',
    component: SafProgressDemoComponent,
    title: 'Progress demo',
  },
  {
    path: 'progress-ring',
    component: SafProgressRingDemoComponent,
    title: 'Progress ring demo',
  },
  {
    path: 'progress-text',
    component: SafProgressTextDemoComponent,
    title: 'Progress text demo',
  },
  {
    path: 'ai-prompt',
    component: SafAIPromptDemoComponent,
    title: 'AI prompt demo',
  },
  {
    path: 'radio-group',
    component: SafRadioGroupDemoComponent,
    title: 'Radio group demo',
  },
  { path: 'select', component: SafSelectDemoComponent, title: 'Select demo' },
  {
    path: 'side-nav',
    component: SafSideNavComponentDemo,
    title: 'Side nav demo',
  },
  {
    path: 'skip-link',
    component: SafSkipLinkDemoComponent,
    title: 'Skip link demo',
  },
  {
    path: 'skip-link-group',
    component: SafSkipLinkGroupDemoComponent,
    title: 'Skip link group demo',
  },
  { path: 'slider', component: SafSliderDemoComponent, title: 'Slider demo' },
  {
    path: 'splitter',
    component: SafSplitterDemoComponent,
    title: 'Splitter demo',
  },
  {
    path: 'status',
    component: SafStatusDemoComponent,
    title: 'Status demo',
  },
  { path: 'switch', component: SafSwitchDemoComponent, title: 'Switch demo' },
  {
    path: 'table',
    component: SafTableDemoComponent,
    title: 'Table demo',
  },
  { path: 'tabs', component: SafTabsDemoComponent, title: 'Tabs demo' },
  {
    path: 'search-field',
    component: SafSearchFieldDemoComponent,
    title: 'Search field demo',
  },
  {
    path: 'text',
    component: SafTextDemoComponent,
    title: 'Text demo',
  },
  {
    path: 'text-area',
    component: SafTextAreaDemoComponent,
    title: 'Text area demo',
  },
  {
    path: 'text-field',
    component: SafTextFieldDemoComponent,
    title: 'Text field demo',
  },
  {
    path: 'theme-provider',
    component: SafThemeProviderPreviewComponent,
    title: 'Theme Provider preview',
  },
  {
    path: 'toolbar',
    component: SafToolbarDemoComponent,
    title: 'Toolbar demo',
  },
  {
    path: 'tooltip',
    component: SafTooltipDemoComponent,
    title: 'Tooltip demo',
  },
  {
    path: 'tree-view',
    component: SafTreeViewDemoComponent,
    title: 'Tree view demo',
  },
  {
    path: 'wijmo',
    component: WijmoDemoComponent,
    title: 'Wijmo demo',
  },
  {
    path: 'wijmo-manage-columns',
    component: WijmoManageColumnsDemoComponent,
    title: 'Wijmo manage columns demo',
  },
  {
    path: 'windows',
    component: SafWindowsDemoComponent,
    title: 'Windows demo',
  },

  // Preview components
  {
    path: 'button-+-dialog',
    component: ButtonDialogDemoComponent,
    title: 'Button + Dialog demo',
  },
  {
    path: 'button-+-menu',
    component: ButtonMenuDemoComponent,
    title: 'Button + Menu demo',
  },
  {
    path: 'basic-form',
    component: SafBasicFormComponent,
    title: 'Basic form demo',
  },
  {
    path: 'carousel',
    component: SafCarouselDemoComponent,
    title: 'Carousel demo',
  },
  {
    path: 'comment-field',
    component: SafCommentFieldDemoComponent,
    title: 'Comment field demo',
  },
  {
    path: 'empty-state',
    component: SafEmptyStateDemoComponent,
    title: 'Empty state demo',
  },
  {
    path: 'footer',
    component: SafFooterDemoComponent,
    title: 'Footer demo',
  },
  {
    path: 'stepper',
    component: SafStepperDemoComponent,
    title: 'Stepper demo',
  },
  {
    path: 'ai-workspace',
    component: SafWorkspaceDemoComponent,
    title: 'Workspace demo',
  },
  {
    path: 'layout-grid',
    component: SafLayoutGridDemoComponent,
    title: 'Layout Grid demo',
  },
  {
    path: 'wizard',
    component: SafWizardDemoComponent,
    title: 'Wizard demo',
  },
  // Additional links
  {
    path: 'adopting-saffron-tokens',
    component: TokenDemo,
    title: 'Tokens demo',
  },
  { path: 'design-token-study', component: TokenStudy, title: 'Tokens study' },
  {
    path: 'documentation-study',
    component: DocumentationStudy,
    title: 'Documentation study',
  },
      { path: '', redirectTo: 'getting-started', pathMatch: 'full' },
      // Intercepts the hash anchor that saf-back-to-top generates (<a href="#page-top">).
      // HashLocationStrategy treats the hash as a route, so the router would otherwise
      // redirect to /getting-started. Returning false cancels the navigation (URL unchanged)
      // while scrollTo(0,0) performs the actual scroll.
      { path: 'page-top', canActivate: [() => { window.scrollTo({ top: 0, behavior: 'smooth' }); return false; }], children: [] },
      // Intercepts all saf-anchor href="#section-id" clicks.
      // HashLocationStrategy turns "#section-id" into the route "section-id", which would
      // hit the ** wildcard and redirect to getting-started.
      // This guard checks whether the unmatched path is an existing DOM element ID:
      //   - Found  → scrollIntoView + update address bar to #/currentRoute#id, return false
      //   - Not found → redirect to getting-started
      {
        path: '**',
        canActivate: [
          (route: ActivatedRouteSnapshot) => {
            const router = inject(Router);
            const attempted = route.url.map((s) => s.path).join('/');

            // Case 1: compound path with embedded fragment from a pasted URL.
            // HashLocationStrategy may give the router "accordion#section-id" as a
            // single path segment when the user pastes "/#/accordion#section-id".
            // Split it and do a proper navigation so the defined route is matched
            // and anchorScrolling (+ ViewportScroller offset) handles the scroll.
            if (attempted.includes('#')) {
              const hashIdx = attempted.indexOf('#');
              const routePath = attempted.substring(0, hashIdx);
              const fragment = attempted.substring(hashIdx + 1);
              return router.createUrlTree([routePath], { fragment });
            }

            const el = document.getElementById(attempted);
            if (el) {
              // Scroll to element with a 70px top offset (accounts for sticky header).
              const top = el.getBoundingClientRect().top + window.scrollY - 70;
              window.scrollTo({ top, behavior: 'smooth' });
              // Defer replaceState to the next task so it runs AFTER Angular's router
              // restores the URL when the navigation is cancelled (guard returns false).
              // Doing it synchronously here gets overwritten by Angular's own URL restoration.
              const currentPath = router.url.split('#')[0];
              setTimeout(() => {
                window.history.replaceState(null, '', `/#${currentPath}#${attempted}`);
              }, 0);
              return false;
            }
            return router.createUrlTree(['getting-started']);
          },
        ],
        component: GettingStartedComponent,
      },
    ],
  },
];
