import React from 'react';

interface CorsToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const CorsToggle: React.FC<CorsToggleProps> = ({ enabled, onToggle }) => {
  const handleToggle = () => {
    onToggle(!enabled);
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">CORS Unblock:</label>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          enabled ? 'bg-green-600' : 'bg-gray-200'
        }`}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm font-medium text-gray-500">{enabled ? 'Enabled' : 'Disabled'}</span>
    </div>
  );
};

export default CorsToggle;
