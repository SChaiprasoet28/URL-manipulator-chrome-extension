import React from 'react';

interface ProtocolToggleProps {
  protocol: 'http' | 'https';
  onProtocolChange: (protocol: 'http' | 'https') => void;
}

const ProtocolToggle: React.FC<ProtocolToggleProps> = ({ protocol, onProtocolChange }) => {
  const handleToggle = () => {
    onProtocolChange(protocol === 'http' ? 'https' : 'http');
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">Protocol:</label>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          protocol === 'https' ? 'bg-green-600' : 'bg-gray-200'
        }`}
        role="switch"
        aria-checked={protocol === 'https'}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            protocol === 'https' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm font-medium">{protocol === 'https' ? 'HTTPS' : 'HTTP'}</span>
    </div>
  );
};

export default ProtocolToggle;
