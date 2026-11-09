# Saffron components in Angular

## Overview

This sample project is a developer sandbox and playground for developer acceptance testing of Saffron components. Certain components shown may not be available for production use.

For production-ready components, refer to the [Saffron Documentation Site](https://saffron.thomsonreuters.com/).

## Documentation

- [Saffron Documentation Site](https://saffron.thomsonreuters.com/) — component library, design guidance, and API reference
- [FAQ](https://github.com/tr/saffron_angular-examples/blob/main/FAQ.md) — troubleshooting and common questions
- [Build and deployment pipeline](docs/architecture/BUILD-AND-DEPLOYMENT-PIPELINE.md) — GitHub Pages preview and release deployment
- Other Angular versions: [Angular 15](https://github.com/tr/saffron_angular-examples/blob/main/angular15) · [14](https://github.com/tr/saffron_angular-examples/blob/main/angular14) · [13](https://github.com/tr/saffron_angular-examples/blob/main/angular13) · [12](https://github.com/tr/saffron_angular-examples/blob/main/angular12) · [11](https://github.com/tr/saffron_angular-examples/blob/main/angular11) · [10](https://github.com/tr/saffron_angular-examples/blob/main/angular10)

## Quick start

To use the Saffron Web Components in Angular, you can use this sample Angular application as your reference.

Requires Node.js `^22.22.3 || ^24.15.0 || >=26.0.0` (Angular 22 CLI's minimum supported runtimes).

To run this sample project:

1. Clone the project `git clone https://github.com/tr/saffron_angular-example.git`
2. `cd saffron_angular-example`
3. `npm install`
4. `npm run start`

To add Saffron web components to your Angular project:

1. `npm install @saffron/core-components` or `yarn add @saffron/core-components`

2. Create a `saffron-loader.ts` file to register all components:

```typescript
import * as saffronComponents from "@saffron/core-components";

export const loadSaffronComponents = (): void => {
  if (typeof window === "undefined") return;

  Object.values(saffronComponents).forEach((component: any) => {
    if (typeof component === "function" && component.length === 0) {
      try {
        component(); // Invoke the component definition function
      } catch (error) {
        // Silently ignore duplicate registrations
      }
    }
  });
};

loadSaffronComponents();
```

3. Import the loader in `main.ts` **before** bootstrapping your application:

```typescript
import "./saffron-loader"; // This must come before bootstrapApplication
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, appConfig);
```

4. Add `CUSTOM_ELEMENTS_SCHEMA` to your components to use web components:

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-root",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<saf-button appearance="primary">Click</saf-button>`,
})
export class AppComponent {}
```

3. Add the component to your view such as `app.component.html`

`<saf-button appearance="primary">Click</saf-button>`

## Key features

- **Angular integration reference** — demonstrates how to register and use Saffron web components in an Angular application using `CUSTOM_ELEMENTS_SCHEMA`
- **Component sandbox** — covers 70+ Saffron components with live examples and variant exploration
- **Developer acceptance testing** — used by the Saffron team to validate components before they reach production

## Tech stack

| Technology                 | Purpose                         |
| -------------------------- | ------------------------------- |
| Angular 22                 | Application framework           |
| TypeScript                 | Language                        |
| `@saffron/core-components` | Saffron web components          |
| `@saffron/core-styles`     | Design tokens and global styles |
| Angular CLI                | Build and dev server            |
| Jasmine + Karma            | Unit testing                    |

## Contributing

This repo is maintained by the Saffron team. To contribute to the Saffron component library, see [Contributing to Saffron](https://saffron.thomsonreuters.com/?path=/docs/get-started-contributing--docs).

- [`@saffron/core-components` repository](https://github.com/tr/saffron_design-system/tree/main/core-packages/core-components)
- [`@saffron/core-styles` repository](https://github.com/tr/saffron_design-system/tree/main/core-packages/core-styles)
- [Roadmap](https://saffron.thomsonreuters.com/?path=/docs/about-saffron-roadmap--docs)

## Support

- [Report a bug or enhancement](https://forms.office.com/pages/responsepage.aspx?id=ZLjMYhpqXUuOHDl97BqCWLT-Zr9eGJ1Aoo0it293ZMpUMDBTT0dFUTBGOEZBSU1XQU9LQ1JMNlI4TyQlQCN0PWcu)
- [Ask a question or give feedback](https://teams.microsoft.com/l/channel/19%3Ac554c5c248ba4ba491954f4038529bf2%40thread.tacv2/Developer%20Support?groupId=bf66feb4-185e-409d-a28d-22b76f7764ca&tenantId=62ccb864-6a1a-4b5d-8e1c-397dec1a8258)
