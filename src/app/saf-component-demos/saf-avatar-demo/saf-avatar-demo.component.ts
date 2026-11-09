import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-avatar-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-avatar-demo.component.html',
})
export class SafAvatarDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'avatar', label: 'Avatar' },
    { id: 'avatar-signed-in-without-image', label: 'Signed in avatar without image' },
    { id: 'avatar-sizes', label: 'Avatar sizes' },
    { id: 'avatar-signed-in-with-image', label: 'Signed in avatar with image' },
    { id: 'avatar-signed-out-with-icon', label: 'Signed out avatar with icon' },
  ];
}
