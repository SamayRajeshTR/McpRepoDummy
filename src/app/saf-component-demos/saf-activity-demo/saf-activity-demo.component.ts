import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-activity-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-activity-demo.component.html',
})
export class SafActivityDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'activity-note', label: 'Note' },
    { id: 'activity-icon', label: 'Activity with icon' },
    { id: 'activity-signed-in-no-image-avatar', label: 'Signed in no image avatar' },
    { id: 'activity-signed-in-with-image-avatar', label: 'Signed in with image avatar' },
  ];
}
