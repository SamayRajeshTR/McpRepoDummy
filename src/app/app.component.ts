import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';

@Component({
  selector: 'app-root',
  template: `
    <saf-theme-provider mode="light">
      <main>
        <h1>Secure password generator</h1>
        <app-password-generator></app-password-generator>
      </main>
    </saf-theme-provider>
  `,
  styles: [`
    :host { display: block; }
    main { max-width: 44rem; margin-inline: auto; padding: 2rem 1rem; }
  `],
  imports: [PasswordGeneratorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
