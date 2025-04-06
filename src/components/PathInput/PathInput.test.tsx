import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PathInput from './PathInput';

describe('PathInput', () => {
  const mockOnPathChange = jest.fn();
  const mockOnEnterPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the path input with label', () => {
    render(<PathInput path="/test/path" onPathChange={mockOnPathChange} onEnterPress={mockOnEnterPress} />);
    
    expect(screen.getByLabelText(/path/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/path\/to\/resource/i)).toBeInTheDocument();
  });

  it('displays the path value without leading slash', () => {
    render(<PathInput path="/test/path" onPathChange={mockOnPathChange} onEnterPress={mockOnEnterPress} />);
    
    const input = screen.getByPlaceholderText(/path\/to\/resource/i);
    expect(input).toHaveValue('test/path');
  });

  it('calls onPathChange with path including leading slash when input changes', () => {
    render(<PathInput path="/test/path" onPathChange={mockOnPathChange} onEnterPress={mockOnEnterPress} />);
    
    const input = screen.getByPlaceholderText(/path\/to\/resource/i);
    fireEvent.change(input, { target: { value: 'new/path' } });
    
    expect(mockOnPathChange).toHaveBeenCalledWith('/new/path');
  });

  it('adds leading slash to path if not present', () => {
    render(<PathInput path="/test/path" onPathChange={mockOnPathChange} onEnterPress={mockOnEnterPress} />);
    
    const input = screen.getByPlaceholderText(/path\/to\/resource/i);
    fireEvent.change(input, { target: { value: 'newpath' } });
    
    expect(mockOnPathChange).toHaveBeenCalledWith('/newpath');
  });

  it('calls onEnterPress when Enter key is pressed', () => {
    render(<PathInput path="/test/path" onPathChange={mockOnPathChange} onEnterPress={mockOnEnterPress} />);
    
    const input = screen.getByPlaceholderText(/path\/to\/resource/i);
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnEnterPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onEnterPress when Enter key is pressed with modifier keys', () => {
    render(<PathInput path="/test/path" onPathChange={mockOnPathChange} onEnterPress={mockOnEnterPress} />);
    
    const input = screen.getByPlaceholderText(/path\/to\/resource/i);
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });
    
    expect(mockOnEnterPress).not.toHaveBeenCalled();
  });
}); 