import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', () => {
  const mockValue = 'test value';
  const mockOnChange = jest.fn();
  const mockOnEnterPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label and placeholder', () => {
    render(
      <TextInput
        label="Test Label"
        value={mockValue}
        placeholder="Test Placeholder"
        onChange={mockOnChange}
        onEnterPress={mockOnEnterPress}
        id="test-input"
      />
    );

    expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/test placeholder/i)).toBeInTheDocument();
  });

  it('displays the value', () => {
    render(
      <TextInput
        label="Test Label"
        value={mockValue}
        placeholder="Test Placeholder"
        onChange={mockOnChange}
        onEnterPress={mockOnEnterPress}
        id="test-input"
      />
    );

    const input = screen.getByPlaceholderText(/test placeholder/i);
    expect(input).toHaveValue('test value');
  });

  it('calls onChange when input changes', () => {
    render(
      <TextInput
        label="Test Label"
        value={mockValue}
        placeholder="Test Placeholder"
        onChange={mockOnChange}
        onEnterPress={mockOnEnterPress}
        id="test-input"
      />
    );

    const input = screen.getByPlaceholderText(/test placeholder/i);
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalledWith('new value');
  });

  it('calls onEnterPress when Enter key is pressed', () => {
    render(
      <TextInput
        label="Test Label"
        value={mockValue}
        placeholder="Test Placeholder"
        onChange={mockOnChange}
        onEnterPress={mockOnEnterPress}
        id="test-input"
      />
    );

    const input = screen.getByPlaceholderText(/test placeholder/i);
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnEnterPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onEnterPress when Enter key is pressed with modifier keys', () => {
    render(
      <TextInput
        label="Test Label"
        value={mockValue}
        placeholder="Test Placeholder"
        onChange={mockOnChange}
        onEnterPress={mockOnEnterPress}
        id="test-input"
      />
    );

    const input = screen.getByPlaceholderText(/test placeholder/i);
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });

    expect(mockOnEnterPress).not.toHaveBeenCalled();
  });
});
