import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-windows-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-windows-demo.component.html',
})
export class SafWindowsDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'windows', label: 'Windows' },
  ];

  windowData = [
    { title: 'Window One', id: 'win-1', closeable: false },
    { title: 'Window Two', id: 'win-2', closeable: true, isFullWidth: true },
    { title: 'Window Three', id: 'win-3', closeable: true },
  ];

  onClose = (e: any) => {
    this.windowData = this.windowData.filter((i) => i.id !== e.target.id);
  };

  onAdd = () => {
    this.windowData = [
      ...this.windowData,
      {
        title: `Window ${Date.now()}`,
        id: `win-${Date.now()}`,
        closeable: true,
      },
    ];
  };
}
