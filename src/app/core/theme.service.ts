import { computed, Injectable, signal } from '@angular/core';

type ThemeMode = 'auto' | 'light' | 'dark';

const STORAGE_KEY = 'saf-theme-mode';
const CYCLE: Record<ThemeMode, ThemeMode> = { auto: 'light', light: 'dark', dark: 'auto' };
const ICONS: Record<ThemeMode, string> = { auto: 'circle-half-stroke', light: 'sun', dark: 'moon' };
const LABELS: Record<ThemeMode, string> = {
  auto: 'Theme: Auto — click to switch to Light',
  light: 'Theme: Light — click to switch to Dark',
  dark: 'Theme: Dark — click to switch to Auto',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _mode = signal<ThemeMode>(
    (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? 'auto',
  );

  readonly mode = this._mode.asReadonly();
  readonly icon = computed(() => ICONS[this._mode()]);
  readonly ariaLabel = computed(() => LABELS[this._mode()]);

  cycle(): void {
    const next = CYCLE[this._mode()];
    this._mode.set(next);
    localStorage.setItem(STORAGE_KEY, next);
  }
}
