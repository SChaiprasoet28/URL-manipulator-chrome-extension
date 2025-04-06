// Initialize CORS setting
chrome.runtime.onInstalled.addListener(() => {
  console.log('URL Manipulator extension installed');
  // Set default CORS setting
  chrome.storage.local.set({ corsEnabled: false });
});

// Listen for CORS toggle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CORS_TOGGLE') {
    console.log('CORS setting changed:', message.enabled);
    // The actual header modification is handled by the webRequest API
  }
});

// Handle web requests to add CORS headers
chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    // We need to use a synchronous approach due to Chrome API limitations
    let corsEnabled = false;

    // This is a workaround for the async storage API
    try {
      // We'll use a synchronous approach with a global variable
      // This is not ideal but works around the Chrome API limitations
      if (typeof window !== 'undefined' && (window as any).corsEnabled !== undefined) {
        corsEnabled = (window as any).corsEnabled;
      }
    } catch (e) {
      console.error('Error checking CORS setting:', e);
    }

    if (corsEnabled) {
      // Add CORS headers
      const headers = details.responseHeaders || [];
      headers.push({
        name: 'Access-Control-Allow-Origin',
        value: '*',
      });
      headers.push({
        name: 'Access-Control-Allow-Methods',
        value: 'GET, POST, PUT, DELETE, OPTIONS',
      });
      headers.push({
        name: 'Access-Control-Allow-Headers',
        value: 'Content-Type, Authorization, X-Requested-With',
      });

      return { responseHeaders: headers };
    }

    return { responseHeaders: details.responseHeaders };
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'responseHeaders', 'extraHeaders']
);

// Update the global variable when CORS setting changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.corsEnabled) {
    if (typeof window !== 'undefined') {
      (window as any).corsEnabled = changes.corsEnabled.newValue;
    }
  }
});
