# URL Manipulator Chrome Extension

A fun project for Chrome extension that allows users to manipulate and transform URLs according to customizable rules. Built with React, TypeScript, and modern web technologies.

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
- Webpack
- Jest for testing
- ESLint & Prettier for code quality
- Chrome Extension Manifest V3

## Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- Google Chrome browser

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

Start the development server:
```bash
pnpm dev
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
│   ├── background/        # Extension background scripts
│   ├── content/          # Content scripts
│   └── popup/            # Extension popup UI
├── public/                # Static assets
├── scripts/              # Build and utility scripts
├── dist/                 # Built extension files
└── tests/                # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the need for better URL management in web browsers 
