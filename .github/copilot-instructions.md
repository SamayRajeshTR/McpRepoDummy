# Copilot Instructions for Saffron Angular Example

## Project Overview

This is a sample Angular application demonstrating the integration and usage of Saffron Design System components. It serves as a developer sandbox and playground for developer acceptance testing of components.

**Important**: This is a demo/example project. Some components shown may not be available for production use. Always refer to the [Saffron Documentation Site](https://saffron.thomsonreuters.com/) for production-ready components.

## Technology Stack

- **Framework**: Angular 22.x
- **Language**: TypeScript ~6.0.3
- **Build Tool**: Angular CLI
- **Testing**: Jasmine + Karma
- **Design System**: Saffron Design System (@saffron/core-components, @saffron/core-styles)
- **Additional Libraries**: GrapeCity Wijmo components for grids

## Project Structure

```
src/
├── app/
│   ├── saf-component-demos/     # Individual component demonstration pages
│   ├── ready-to-use-components/ # Production-ready component examples
│   ├── preview-components/      # Preview/experimental component examples
│   ├── side-nav/                # Application navigation
│   ├── getting-started/         # Getting started documentation
│   └── app.module.ts            # Main application module
├── assets/                      # Static assets
├── environments/                # Environment configurations
└── styles.scss                  # Global styles
```

## Development Commands

- `npm install` - Install dependencies (Note: @saffron packages are private and require NPM authentication configured in `.npmrc`)
- `npm run start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Production build with watch
- `npm run build:productionWithoutWatch` - Production build
- `npm run test` - Run tests with Karma
- `npm run deploy` - Deploy to GitHub Pages

## Coding Standards

### General Guidelines

1. **EditorConfig**: Follow the `.editorconfig` settings:
   - Use 2 spaces for indentation
   - Use single quotes in TypeScript files
   - UTF-8 charset
   - Insert final newline
   - Trim trailing whitespace

2. **TypeScript**: 
   - Strict mode is enabled
   - Use experimental decorators for Angular
   - Target ES2022
   - Follow Angular style guide

### Component Development

1. **Custom Elements Schema**: The project uses `CUSTOM_ELEMENTS_SCHEMA` in `app.module.ts` to support Saffron web components.

2. **Component Structure**: Each demo component should have:
   - `.component.ts` - Component logic
   - `.component.html` - Component template
   - `.component.spec.ts` - Component tests
   - Optional: `.component.scss` - Component styles

3. **Component Naming**:
   - Prefix Saffron component demos with `Saf`
   - Use PascalCase for class names: `SafButtonDemoComponent`
   - Use kebab-case for selectors: `saf-button-demo`

4. **Saffron Component Usage**:
   - Saffron components use web component syntax: `<saf-button>`, `<saf-icon>`, etc.
   - Components are auto-registered; no explicit imports needed in most cases
   - Use slots for component composition: `<saf-icon slot="start">`
   - Common attributes: `appearance`, `density`, `icon-name`, `disabled`, `icon-only`

### Component Demo Pattern

When creating a new component demo:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'saf-[component]-demo',
  templateUrl: './saf-[component]-demo.component.html',
  styles: ['/* inline styles if needed */']
})
export class Saf[Component]DemoComponent {
  // Component logic here
}
```

Demo HTML structure should include:
- A heading with the component name and link anchor
- A message or status display area
- A demo area showing the component in action
- Various examples showing different configurations

### Module Organization

- Register demo components in `app.module.ts` under appropriate categories:
  - `readyToUseComponents` - Production-ready components
  - `previewComponents` - Preview/experimental components
  - `layoutComponents` - Layout and navigation components

### Styling

- Global styles are in `src/styles.scss`
- Saffron core styles are imported from `@saffron/core-styles`
- Component-specific styles can be inline in the component decorator or in separate `.scss` files
- Follow Saffron design tokens and variables

### Testing

- Write unit tests for all components using Jasmine
- Tests should be in `.spec.ts` files next to the component
- Run tests before committing: `npm run test`

## Dependencies

### Saffron Packages

Saffron packages (`@saffron/core-components`, `@saffron/core-styles`) are private and require NPM authentication configured in `.npmrc`. Dependencies are managed in `package.json` and installed via `npm install`.

### Version Management

- Keep Angular version at 22.x
- Saffron packages use stable versions - refer to package.json for current versions
- Update Angular using: `ng update @angular/core@22 @angular/cli@22`

## Deployment

- The application deploys to GitHub Pages
- Deployment is automated via GitHub Actions when PRs are merged
- Multi-deployment strategy supports multiple versions
- Base href is set to `./` for GitHub Pages compatibility

## Common Patterns

1. **Event Handling**: Use Angular event binding with Saffron components:
   ```html
   <saf-button (click)="handleClick()">Click me</saf-button>
   ```

2. **Icons**: Use Saffron icon component:
   ```html
   <saf-icon icon-name="plus"></saf-icon>
   ```

3. **Accessibility**: Always include `aria-label` for icon-only buttons:
   ```html
   <saf-button icon-only aria-label="Add new">
     <saf-icon icon-name="plus"></saf-icon>
   </saf-button>
   ```

4. **Responsive Design**: Use Saffron's density attribute for compact UIs:
   ```html
   <saf-button density="compact">Compact</saf-button>
   ```

## Build Configuration

- Output directory: `dist/saffron-angular-example`
- Budget limits: 10MB initial, 2MB component styles
- Source maps enabled for debugging
- AOT compilation enabled for production

## Links and Resources

- [Saffron Documentation](https://saffron.thomsonreuters.com/)
- [Saffron Core Components Repository](https://github.com/tr/saffron_design-system/tree/main/core-packages/core-components)
- [Saffron Core Styles Repository](https://github.com/tr/saffron_design-system/tree/main/core-packages/core-styles)
- [Report a Bug](https://forms.office.com/pages/responsepage.aspx?id=ZLjMYhpqXUuOHDl97BqCWLT-Zr9eGJ1Aoo0it293ZMpUMDBTT0dFUTBGOEZBSU1XQU9LQ1JMNlI4TyQlQCN0PWcu)

## Important Notes

- This is a developer sandbox - not all components are production-ready
- Always verify component status in official [Saffron Documentation](https://saffron.thomsonreuters.com/) before using in production
- The project uses HashLocationStrategy for routing
- Wijmo components require special licensing and setup
