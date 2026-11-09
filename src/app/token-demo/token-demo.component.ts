import { Component, HostBinding, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-token-demo',
  templateUrl: './token-demo.component.html',
  styleUrls: ['./token-demo.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TokenDemo {
  @HostBinding('class.TokenDemo') get setDefaultClass() {
    return true;
  }
}
