import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

type ThemeMode = 'auto' | 'light' | 'dark';

@Component({
  selector: 'saf-theme-provider-demo',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-theme-provider-demo.component.html',
  styles: [
    ':host { display: block; min-height: 100vh; padding: 24px; }',
    '.ThemeProviderDemo { margin: 0 auto; max-width: 480px; }',
    '.ThemeProviderDemo-controls { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }',
    '.ThemeProviderDemo-copy { margin: 0 0 8px; }',
  ],
})
export class SafThemeProviderDemoComponent {
  public mode: ThemeMode = 'auto';

  public setMode(mode: ThemeMode): void {
    this.mode = mode;
  }
}
