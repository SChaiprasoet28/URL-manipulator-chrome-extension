import React from 'react';
import TextInput from '../shared/TextInput';

interface SubdomainInputProps {
  subdomain: string;
  onSubdomainChange: (subdomain: string) => void;
  onEnterPress: () => void;
}

const SubdomainInput: React.FC<SubdomainInputProps> = ({
  subdomain,
  onSubdomainChange,
  onEnterPress,
}) => {
  return (
    <TextInput
      label="Subdomain"
      value={subdomain}
      placeholder="www"
      onChange={onSubdomainChange}
      onEnterPress={onEnterPress}
      id="subdomain"
    />
  );
};

export default SubdomainInput;
