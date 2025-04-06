import React, { useState, useEffect, KeyboardEvent as ReactKeyboardEvent } from 'react';
import ProtocolToggle from './components/ProtocolToggle/ProtocolToggle';
import DomainInput from './components/DomainInput/DomainInput';
import SubdomainInput from './components/SubdomainInput/SubdomainInput';
import PathInput from './components/PathInput/PathInput';
import QueryParams from './components/QueryParams/QueryParams';
import CorsToggle from './components/CorsToggle/CorsToggle';
import ActionButtons from './components/ActionButtons/ActionButtons';

interface QueryParam {
  key: string;
  value: string;
  enabled: boolean;
}

const App: React.FC = () => {
  const [protocol, setProtocol] = useState<'http' | 'https'>('https');
  const [domain, setDomain] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [path, setPath] = useState('');
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [corsEnabled, setCorsEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('App component mounted');

    try {
      // Get current URL when popup opens
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        console.log('Tabs query result:', tabs);

        if (tabs[0]?.url) {
          try {
            const currentUrl = new URL(tabs[0].url);
            console.log('Current URL:', currentUrl.toString());

            setProtocol(currentUrl.protocol.replace(':', '') as 'http' | 'https');
            setDomain(currentUrl.hostname.split('.').slice(-2).join('.'));
            setSubdomain(currentUrl.hostname.split('.').slice(0, -2).join('.'));
            setPath(currentUrl.pathname);

            const params: QueryParam[] = [];
            currentUrl.searchParams.forEach((value, key) => {
              params.push({ key, value, enabled: true });
            });
            setQueryParams(params);
          } catch (error) {
            console.error('Error parsing URL:', error);
            setError('Error parsing URL: ' + (error as Error).message);
          }
        } else {
          console.log('No URL found in active tab');
          setError('No URL found in active tab');
        }
        setIsLoaded(true);
      });

      // Get current CORS setting
      chrome.storage.local.get(['corsEnabled'], result => {
        console.log('CORS setting:', result.corsEnabled);
        setCorsEnabled(result.corsEnabled || false);
      });
    } catch (error) {
      console.error('Error in useEffect:', error);
      setError('Error initializing: ' + (error as Error).message);
      setIsLoaded(true);
    }
  }, []);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      // Only handle Enter if we're not in a textarea or if we're in an input and it's not being used for composition
      const target = event.target as HTMLElement;
      if (
        target.tagName !== 'TEXTAREA' &&
        (target.tagName !== 'INPUT' || (target as HTMLInputElement).type === 'submit')
      ) {
        event.preventDefault();
        handleSave();
      }
    }
  };

  const handleCorsToggle = (enabled: boolean) => {
    setCorsEnabled(enabled);
    chrome.storage.local.set({ corsEnabled: enabled }, () => {
      // Notify background script about the change
      chrome.runtime.sendMessage({
        type: 'CORS_TOGGLE',
        enabled,
      });
    });
  };

  const handleSave = () => {
    // First clean up empty query parameters from the UI
    const cleanedParams = queryParams.filter(
      param => param.key.trim() !== '' || param.value.trim() !== ''
    );
    setQueryParams(cleanedParams);

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]?.id) {
        // Construct new URL
        let newUrl = `${protocol}://`;
        if (subdomain) {
          newUrl += `${subdomain}.`;
        }
        newUrl += domain;

        // Add path
        if (path) {
          newUrl += path;
        }

        // Add enabled query parameters that have both key and value
        const validParams = cleanedParams.filter(
          param => param.enabled && param.key.trim() !== '' && param.value.trim() !== ''
        );

        if (validParams.length > 0) {
          const searchParams = new URLSearchParams();
          validParams.forEach(param => {
            searchParams.append(param.key.trim(), param.value.trim());
          });
          newUrl += `?${searchParams.toString()}`;
        }

        // Navigate to new URL
        chrome.tabs.update(tabs[0].id, { url: newUrl });
      }
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 h-full">
        <h1 className="text-xl font-bold mb-4">URL Manipulator</h1>
        <div className="p-4 bg-red-100 text-red-800 rounded-md">
          <p className="font-medium">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="flex-none px-4 py-3 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-bold">URL Manipulator</h1>
      </div>
      <div className="flex-1 px-4 py-3">
        <div className="space-y-3">
          <ProtocolToggle protocol={protocol} onProtocolChange={setProtocol} />
          <DomainInput domain={domain} onDomainChange={setDomain} onEnterPress={handleSave} />
          <SubdomainInput
            subdomain={subdomain}
            onSubdomainChange={setSubdomain}
            onEnterPress={handleSave}
          />
          <PathInput path={path} onPathChange={setPath} onEnterPress={handleSave} />
          <QueryParams params={queryParams} onParamsChange={setQueryParams} />
        </div>
      </div>
      <div className="flex-none px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="space-y-3">
          <CorsToggle enabled={corsEnabled} onToggle={handleCorsToggle} />
          <ActionButtons onSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default App;
