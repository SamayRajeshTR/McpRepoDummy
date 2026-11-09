import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-chip-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-chip-demo.component.html',
})
export class SafChipDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'chip-clickable-chip', label: 'Clickable chip' },
    { id: 'chip-closable-chip', label: 'Closable chip' },
    { id: 'chip-closable--chip-disabled', label: 'Closable chip disabled' },
    { id: 'chip-disabled-chip', label: 'Disabled chip' },
    { id: 'chip-toggle-chip', label: 'Toggle chip' },
  ];

  ariaPressed = 'true';
  // Toggle aria-pressed attribute
  toggleAriaPressed() {
    this.ariaPressed = this.ariaPressed === 'true' ? 'false' : 'true';
    // Add any other actions you want to perform.
  }

  // Chip click handlers
  handleChipClick() {
    console.log('Clicked on Clickable chip');
  }

  // Chip close handlers
  handleChipClickClose() {
    console.log('Clicked on close chip');
  }
}
