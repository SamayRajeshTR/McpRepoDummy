import { Component, HostBinding, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-token-study',
  templateUrl: './token-study.component.html',
  styleUrls: ['./token-study.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TokenStudy {
  @HostBinding('class.TokenStudy') get setDefaultClass() {
    return true;
  }
}
