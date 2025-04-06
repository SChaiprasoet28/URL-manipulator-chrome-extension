import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CorsToggle from './CorsToggle';

describe('CorsToggle', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the CORS toggle with label', () => {
    render(<CorsToggle enabled={false} onToggle={mockOnToggle} />);
    
    expect(screen.getByText(/cors unblock:/i)).toBeInTheDocument();
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('displays Enabled when enabled is true', () => {
    render(<CorsToggle enabled={true} onToggle={mockOnToggle} />);
    
    expect(screen.getByText('Enabled')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('displays Disabled when enabled is false', () => {
    render(<CorsToggle enabled={false} onToggle={mockOnToggle} />);
    
    expect(screen.getByText('Disabled')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onToggle with true when toggling from false', () => {
    render(<CorsToggle enabled={false} onToggle={mockOnToggle} />);
    
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    
    expect(mockOnToggle).toHaveBeenCalledWith(true);
  });

  it('calls onToggle with false when toggling from true', () => {
    render(<CorsToggle enabled={true} onToggle={mockOnToggle} />);
    
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    
    expect(mockOnToggle).toHaveBeenCalledWith(false);
  });
}); 