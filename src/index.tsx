import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

console.log('URL Manipulator popup script loaded');

function initializeApp() {
  console.log('Initializing app...');

  // Add error boundary for uncaught errors
  window.onerror = function (message, source, lineno, colno, error) {
    console.error('Global error:', { message, source, lineno, colno, error });
    return false;
  };

  const rootElement = document.getElementById('root');
  console.log('Root element:', rootElement);

  if (!rootElement) {
    console.error('Root element not found');
    document.body.innerHTML =
      '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
    return;
  }

  try {
    console.log('Root element found, creating React root');
    const root = createRoot(rootElement);

    console.log('Rendering React app');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Error rendering React app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red;">
        <h2>Error Loading Extension</h2>
        <p>${error instanceof Error ? error.message : 'Unknown error occurred'}</p>
      </div>
    `;
  }
}

// Initialize immediately if document is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already ready, initializing immediately');
  initializeApp();
} else {
  console.log('Document not ready, waiting for DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    initializeApp();
  });
}
