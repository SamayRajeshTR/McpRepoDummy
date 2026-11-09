import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-file-upload-progress-panel-demo',
  templateUrl: './saf-file-upload-progress-panel.component.html',
  styleUrls: ['./saf-file-upload-progress-panel.styles.scss'],
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class SafFileUploadProgressPanelDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'file-upload-progress-panel-default', label: 'File upload progress panel' },
  ];

}
