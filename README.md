# Secure Password Generator

A standalone Angular application for generating strong random passwords, built with
Saffron Design System components. The password generator is the application’s main
page; the original component demos and navigation have been removed.

## Features

- Cryptographically secure generation using browser Web Crypto.
- Configurable length from 12 to 128 characters (20 by default).
- Lowercase, uppercase, numbers, and symbols, with at least one character from
  each selected type.
- Show/hide, copy, and clear controls.
- Passwords remain in page memory: the generator does not send, log, or persist them.

## Getting started

Requires Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`, npm, and a modern browser.
The Saffron packages are private: configure authentication for the registry in
`.npmrc` using your organization’s approved process. Never commit credentials.

```bash
npm ci
npm start
```

Open `http://localhost:4200`.

## Usage

1. Choose a length and at least one character type.
2. Select **Generate password**.
3. Use **Show password** or **Copy password**, then save it in a trusted password manager.
4. Select **Clear password** when finished.

Changing the settings clears the previous password so it cannot be mistaken for
a password generated with the new options.

## Security

Generation uses `crypto.getRandomValues`, never `Math.random`. Rejection sampling
avoids modulo bias, and candidates missing a selected character type are retried.
If secure randomness is unavailable, generation fails rather than falling back.

Longer passwords with more character types provide more protection; prefer the
default settings or stronger ones. Use a unique password for every account.

Clipboard access requires HTTPS or localhost and browser permission. If copying
is unavailable, show the password and copy it manually. Other applications or
clipboard history may retain copied values; **Clear password** only clears this
page, not the system clipboard. Closing or refreshing the page discards its state.

## Development

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Create the production build |
| `npm run lint` | Run the configured Angular/TypeScript lint checks |
| `npm test -- --watch=false` | Run Jasmine/Karma tests once |

Tests require Chrome or Chromium; set `CHROME_BIN` to its executable if necessary.
Build output is written to `dist/password-generator/browser`. Serve that directory
as static files over HTTPS for deployment.

## Project structure

```text
src/
  app/
    app.component.ts             # Main page and Saffron theme
    app.config.ts                # Angular providers
    password-generator/
      password-generator.ts     # Secure generation logic
      password-generator.component.*  # UI and component tests
      password-generator.spec.ts       # Generation tests
  saffron-loader.ts             # Saffron web-component registration
  styles.scss                  # Saffron styles and app typography
```

Built with Angular, TypeScript, Saffron, and Jasmine/Karma. See the
[Saffron documentation](https://saffron.thomsonreuters.com/) for design-system guidance.
