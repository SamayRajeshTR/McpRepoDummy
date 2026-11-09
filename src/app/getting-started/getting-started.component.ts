import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GettingStartedComponent {
  importWebComponentsCode = `
    import { SafButton } from '@saffron/core-components';
  `;

  importCustomElementsCode = `import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  // Component logic
}`;

  importStylesCode = `
    @use "./node_modules/@saffron/core-styles/dist/index.css";
  `;
}
