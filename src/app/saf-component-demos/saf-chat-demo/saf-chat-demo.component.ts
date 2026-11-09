import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-chat-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-chat-demo.component.html',
})
export class SafChatDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'ai-experience-chat', label: 'Chat' },
  ];

  airplaneIcon = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'><path fill='currentColor' fill-rule='evenodd' d='M15.354.646a.5.5 0 0 1 .119.517l-5 14.5a.5.5 0 0 1-.927.046l-3-6.5a.5.5 0 0 1 .1-.563l3-3a.5.5 0 0 1 .708.708L7.6 9.107l2.333 5.054 4.26-12.354-12.354 4.26 3.352 1.547a.5.5 0 1 1-.418.908L.29 6.454a.5.5 0 0 1 .046-.927l14.5-5a.5.5 0 0 1 .517.12Z' clip-rule='evenodd'/></svg>`;
}
