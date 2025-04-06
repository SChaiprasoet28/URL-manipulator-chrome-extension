import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButtons from '../ActionButtons/ActionButtons';

describe('ActionButtons', () => {
  it('renders the Save & Apply button', () => {
    render(<ActionButtons onSave={() => {}} />);
    expect(screen.getByRole('button', { name: /save & apply/i })).toBeInTheDocument();
  });

  it('calls onSave when the button is clicked', () => {
    const mockOnSave = jest.fn();
    render(<ActionButtons onSave={mockOnSave} />);
    
    const button = screen.getByRole('button', { name: /save & apply/i });
    fireEvent.click(button);
    
    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  it('has the correct styling classes', () => {
    render(<ActionButtons onSave={() => {}} />);
    const button = screen.getByRole('button', { name: /save & apply/i });
    
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'px-4',
      'py-2',
      'border',
      'border-transparent',
      'text-sm',
      'font-medium',
      'rounded-md',
      'shadow-sm',
      'text-white',
      'bg-indigo-600',
      'hover:bg-indigo-700',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-indigo-500'
    );
  });

  it('renders within a flex container with correct spacing', () => {
    const { container } = render(<ActionButtons onSave={() => {}} />);
    const wrapper = container.firstChild;
    
    expect(wrapper).toHaveClass('flex', 'justify-end', 'space-x-3');
  });
}); 