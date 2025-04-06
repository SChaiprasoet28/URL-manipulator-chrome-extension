import React from 'react';

interface ActionButtonsProps {
  onSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave }) => {
  return (
    <div className="flex justify-end space-x-3">
      <button
        onClick={onSave}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save & Apply
      </button>
    </div>
  );
};

export default ActionButtons;
