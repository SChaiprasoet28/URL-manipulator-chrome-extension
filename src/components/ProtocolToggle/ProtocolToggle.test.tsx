import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProtocolToggle from './ProtocolToggle';

describe('ProtocolToggle', () => {
  const mockOnProtocolChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the protocol toggle with label', () => {
    render(<ProtocolToggle protocol="http" onProtocolChange={mockOnProtocolChange} />);

    expect(screen.getByText(/protocol:/i)).toBeInTheDocument();
    expect(screen.getByText('HTTP')).toBeInTheDocument();
  });

  it('displays HTTP when protocol is http', () => {
    render(<ProtocolToggle protocol="http" onProtocolChange={mockOnProtocolChange} />);

    expect(screen.getByText('HTTP')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('displays HTTPS when protocol is https', () => {
    render(<ProtocolToggle protocol="https" onProtocolChange={mockOnProtocolChange} />);

    expect(screen.getByText('HTTPS')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onProtocolChange with https when toggling from http', () => {
    render(<ProtocolToggle protocol="http" onProtocolChange={mockOnProtocolChange} />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    expect(mockOnProtocolChange).toHaveBeenCalledWith('https');
  });

  it('calls onProtocolChange with http when toggling from https', () => {
    render(<ProtocolToggle protocol="https" onProtocolChange={mockOnProtocolChange} />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    expect(mockOnProtocolChange).toHaveBeenCalledWith('http');
  });
});
