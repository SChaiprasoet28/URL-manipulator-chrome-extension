import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubdomainInput from './SubdomainInput';

describe('SubdomainInput', () => {
  const mockSubdomain = 'test';
  const mockOnSubdomainChange = jest.fn();
  const mockOnEnterPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the subdomain input with label', () => {
    render(
      <SubdomainInput
        subdomain={mockSubdomain}
        onSubdomainChange={mockOnSubdomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    expect(screen.getByLabelText(/subdomain/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/www/i)).toBeInTheDocument();
  });

  it('displays the subdomain value', () => {
    render(
      <SubdomainInput
        subdomain={mockSubdomain}
        onSubdomainChange={mockOnSubdomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    const input = screen.getByPlaceholderText(/www/i);
    expect(input).toHaveValue('test');
  });

  it('calls onSubdomainChange when input changes', () => {
    render(
      <SubdomainInput
        subdomain={mockSubdomain}
        onSubdomainChange={mockOnSubdomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    const input = screen.getByPlaceholderText(/www/i);
    fireEvent.change(input, { target: { value: 'newsubdomain' } });

    expect(mockOnSubdomainChange).toHaveBeenCalledWith('newsubdomain');
  });

  it('calls onEnterPress when Enter key is pressed', () => {
    render(
      <SubdomainInput
        subdomain={mockSubdomain}
        onSubdomainChange={mockOnSubdomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    const input = screen.getByPlaceholderText(/www/i);
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnEnterPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onEnterPress when Enter key is pressed with modifier keys', () => {
    render(
      <SubdomainInput
        subdomain={mockSubdomain}
        onSubdomainChange={mockOnSubdomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    const input = screen.getByPlaceholderText(/www/i);
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });

    expect(mockOnEnterPress).not.toHaveBeenCalled();
  });
});
