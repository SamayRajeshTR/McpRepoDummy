import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterGroup, generatePassword } from './password-generator';

@Component({
  selector: 'app-password-generator',
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss'],
})
export class PasswordGeneratorComponent {
  length = 20;
  readonly characterTypes: { key: CharacterGroup; label: string; selected: boolean }[] = [
    { key: 'lowercase', label: 'Lowercase (a–z)', selected: true },
    { key: 'uppercase', label: 'Uppercase (A–Z)', selected: true },
    { key: 'digits', label: 'Numbers (0–9)', selected: true },
    { key: 'symbols', label: 'Symbols (!@#$…)', selected: true },
  ];
  password = '';
  visible = false;
  error = '';
  status = '';

  generate(): void {
    this.clear();
    try {
      this.password = generatePassword({
        length: this.length,
        groups: this.characterTypes.filter(type => type.selected).map(type => type.key),
      });
      this.status = 'New password generated.';
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Unable to generate a secure password.';
    }
  }

  clear(): void {
    this.password = '';
    this.visible = false;
    this.error = '';
    this.status = '';
  }

  async copy(): Promise<void> {
    if (!this.password) {
      return;
    }
    const password = this.password;
    this.status = '';
    try {
      await navigator.clipboard.writeText(password);
      if (this.password === password) {
        this.status = 'Password copied. Clear your clipboard after use.';
      }
    } catch {
      if (this.password === password) {
        this.status = 'Copy unavailable. Show the password and copy it manually.';
      }
    }
  }
}
