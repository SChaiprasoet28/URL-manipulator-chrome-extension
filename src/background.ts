/* eslint-disable no-console */
chrome.runtime.onInstalled.addListener(() => {
  console.log('URL Manipulator extension installed');
  chrome.storage.local.set({ corsEnabled: false });
});

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === 'CORS_TOGGLE') {
    console.log('CORS setting changed:', message.enabled);
  }
});

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    let corsEnabled = false;

    try {
      if (
        typeof window !== 'undefined' &&
        (window as { corsEnabled?: boolean }).corsEnabled !== undefined
      ) {
        corsEnabled = (window as { corsEnabled?: boolean }).corsEnabled || false;
      }
    } catch (e) {
      console.error('Error checking CORS setting:', e);
    }

    if (corsEnabled) {
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

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.corsEnabled) {
    if (typeof window !== 'undefined') {
      (window as { corsEnabled?: boolean }).corsEnabled = changes.corsEnabled.newValue;
    }
  }
});
