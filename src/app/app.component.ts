import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [':host { display: block; height: 100%; }'],
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'saffron-angular-example';

  constructor(scroller: ViewportScroller) {
    // Offset anchor scrolling by 70px so sections land below the sticky header.
    // This is used by anchorScrolling: 'enabled' (configured in app.config.ts)
    // when navigating to a route that has a URL fragment (e.g. pasted URLs).
    scroller.setOffset([0, 70]);
  }
}
