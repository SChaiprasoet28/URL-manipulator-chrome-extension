import React, { KeyboardEvent } from 'react';

interface TextInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onEnterPress: () => void;
  id: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  onEnterPress,
  id,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      onEnterPress();
    }
  };

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput; 