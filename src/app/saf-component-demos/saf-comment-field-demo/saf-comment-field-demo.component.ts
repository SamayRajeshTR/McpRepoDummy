import { FormsModule } from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-comment-field-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-comment-field-demo.component.html',
})
export class SafCommentFieldDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'comment-field', label: 'Comment field' },
  ];
}
