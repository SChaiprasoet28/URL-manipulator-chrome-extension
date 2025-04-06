import React from 'react';
import TextInput from '../shared/TextInput';

interface DomainInputProps {
  domain: string;
  onDomainChange: (domain: string) => void;
  onEnterPress: () => void;
}

const DomainInput: React.FC<DomainInputProps> = ({ domain, onDomainChange, onEnterPress }) => {
  return (
    <TextInput
      label="Domain"
      value={domain}
      placeholder="example.com"
      onChange={onDomainChange}
      onEnterPress={onEnterPress}
      id="domain"
    />
  );
};

export default DomainInput;
