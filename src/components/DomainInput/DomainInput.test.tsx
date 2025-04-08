import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DomainInput from './DomainInput';

describe('DomainInput', () => {
  const mockDomain = 'example.com';
  const mockOnDomainChange = jest.fn();
  const mockOnEnterPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the domain input with label', () => {
    render(
      <DomainInput
        domain={mockDomain}
        onDomainChange={mockOnDomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    expect(screen.getByLabelText(/domain/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/example.com/i)).toBeInTheDocument();
  });

  it('displays the domain value', () => {
    render(
      <DomainInput
        domain={mockDomain}
        onDomainChange={mockOnDomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    const input = screen.getByPlaceholderText(/example.com/i);
    expect(input).toHaveValue('example.com');
  });

  it('calls onDomainChange when input changes', () => {
    render(
      <DomainInput
        domain={mockDomain}
        onDomainChange={mockOnDomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    const input = screen.getByPlaceholderText(/example.com/i);
    fireEvent.change(input, { target: { value: 'newdomain.com' } });

    expect(mockOnDomainChange).toHaveBeenCalledWith('newdomain.com');
  });

  it('calls onEnterPress when Enter key is pressed', () => {
    render(
      <DomainInput
        domain={mockDomain}
        onDomainChange={mockOnDomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    const input = screen.getByPlaceholderText(/example.com/i);
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnEnterPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onEnterPress when Enter key is pressed with modifier keys', () => {
    render(
      <DomainInput
        domain={mockDomain}
        onDomainChange={mockOnDomainChange}
        onEnterPress={mockOnEnterPress}
      />
    );

    const input = screen.getByPlaceholderText(/example.com/i);
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });

    expect(mockOnEnterPress).not.toHaveBeenCalled();
  });
});
