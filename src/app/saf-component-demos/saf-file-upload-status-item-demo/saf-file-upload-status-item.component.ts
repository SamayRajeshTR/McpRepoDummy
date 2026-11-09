import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-file-upload-status-item-demo',
  templateUrl: './saf-file-upload-status-item.component.html',
  styleUrls: ['./saf-file-upload-status-item.styles.scss'],
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class SafFileUploadStatusItemDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'file-upload-status-item-success', label: 'Success' },
    { id: 'file-upload-status-item-uploading', label: 'Uploading' },
    { id: 'file-upload-status-item-paused', label: 'Paused' },
    { id: 'file-upload-status-item-pending', label: 'Pending' },
    { id: 'file-upload-status-item-error', label: 'Error' },
  ];

}
