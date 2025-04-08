# URL Manipulator Chrome Extension
![image](https://github.com/user-attachments/assets/5b471735-ee82-4366-8f35-b0fd3bdb923f)

A browser extension that enables URL manipulation and transformation through customizable rules, built with React, TypeScript, and modern web technologies.

Created to streamline URL management for web developers.

## Features

- 🎯 URL pattern matching and transformation
- ⚡ Real-time URL manipulation
- 🎨 Modern, responsive UI with TailwindCSS
- 🔒 Secure and privacy-focused
- ⚙️ Customizable rules and patterns
- 📱 Cross-browser compatibility

## Tech Stack

- React 18
- TypeScript
- TailwindCSS
- RSpack (for fast, Rust-based bundling)
- Jest for testing
- ESLint & Prettier for code quality
- Chrome Extension Manifest V3

## Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- Chromium based browser

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SChaiprasoet28/URL-manipulator-chrome-extension.git
   cd URL-manipulator-chrome-extension
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the extension:
   ```bash
   pnpm build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` directory from this project

## Development

Start the development server with watch mode:
```bash
pnpm watch
```

Run tests:
```bash
pnpm test
```

Build for production:
```bash
pnpm build
```

## Project Structure

```
URL-manipulator-chrome-extension/
├── src/                    # Source files
│   ├── components/        # React components
│   ├── background.ts      # Extension background script
│   ├── index.tsx          # Extension popup entry point
│   └── styles.css         # Global styles with Tailwind
├── public/                # Static assets
│   ├── icons/            # Extension icons
│   ├── index.html        # Popup HTML template
│   └── manifest.json     # Extension manifest
├── scripts/              # Build and utility scripts
├── dist/                 # Built extension files
└── tests/                # Test files
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
