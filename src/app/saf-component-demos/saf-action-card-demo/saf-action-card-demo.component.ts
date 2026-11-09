import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { LinkIconComponent } from 'src/app/link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-action-card-demo',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-action-card-demo.component.html',
  imports: [LinkIconComponent, InPageNavigationComponent],
})
export class SafActionCardDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'action-card-with-footer', label: 'With footer' },
    { id: 'action-card-title-and-description', label: 'Title and description' },
    { id: 'action-card-title-only', label: 'Title only' },
    { id: 'action-card-with-router', label: 'With router' },
    { id: 'action-card-compact-action-card', label: 'Compact action card' },
    { id: 'action-card-action-card-group', label: 'Action card group' },
  ];

  constructor(private router: Router) {}

  onButtonClick(event: Event): void {
    console.log('Button clicked', event);
  }

  onNavigate(event: Event): void {
    event.preventDefault();
    console.log('SPA navigation clicked');
    this.router.navigate(['/']);
  }
}
