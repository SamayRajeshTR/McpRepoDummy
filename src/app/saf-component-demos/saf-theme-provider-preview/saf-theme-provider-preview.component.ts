import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-theme-provider-preview',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-theme-provider-preview.component.html',
  styles: [
    '.ThemeProviderPreview { display: grid; gap: 16px; margin: 0 auto; max-width: 720px; }',
    '.ThemeProviderPreview-copy { margin: 0 0 12px; }',
    '.ThemeProviderPreview-frame { background: transparent; border: 1px solid var(--saf-color-border-subtle, #d9dde6); border-radius: 12px; height: 560px; width: 100%; }',
  ],
})
export class SafThemeProviderPreviewComponent {
  public readonly inPageLinks: InPageNavigationLink[] = [
    { id: 'theme-provider-preview', label: 'Theme Provider Preview' },
  ];
}