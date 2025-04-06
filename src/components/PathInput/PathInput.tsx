import React, { KeyboardEvent } from 'react';

interface PathInputProps {
  path: string;
  onPathChange: (path: string) => void;
  onEnterPress: () => void;
}

const PathInput: React.FC<PathInputProps> = ({ path, onPathChange, onEnterPress }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPath = e.target.value;
    if (newPath && !newPath.startsWith('/')) {
      newPath = `/${newPath}`;
    }
    onPathChange(newPath);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      onEnterPress();
    }
  };

  return (
    <div className="space-y-1">
      <label htmlFor="path" className="block text-sm font-medium text-gray-700">
        Path
      </label>
      <div className="flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          /
        </span>
        <input
          type="text"
          id="path"
          value={path.startsWith('/') ? path.substring(1) : path}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="path/to/resource"
        />
      </div>
    </div>
  );
};

export default PathInput; 