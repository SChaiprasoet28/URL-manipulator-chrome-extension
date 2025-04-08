import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QueryParams from './QueryParams';

describe('QueryParams', () => {
  const mockParams = [
    { key: 'param1', value: 'value1', enabled: true },
    { key: 'param2', value: 'value2', enabled: false },
  ];

  const mockOnParamsChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with initial params', () => {
    render(<QueryParams params={mockParams} onParamsChange={mockOnParamsChange} />);

    expect(screen.getByText('Query Parameters')).toBeInTheDocument();
    expect(screen.getByText('Add Parameter')).toBeInTheDocument();

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4); // 2 params * 2 inputs each (key and value)

    expect(inputs[0]).toHaveValue('param1');
    expect(inputs[1]).toHaveValue('value1');
    expect(inputs[2]).toHaveValue('param2');
    expect(inputs[3]).toHaveValue('value2');
  });

  it('handles adding a new parameter', () => {
    render(<QueryParams params={mockParams} onParamsChange={mockOnParamsChange} />);

    const addButton = screen.getByText('Add Parameter');
    fireEvent.click(addButton);

    expect(mockOnParamsChange).toHaveBeenCalledWith([
      ...mockParams,
      { key: '', value: '', enabled: true },
    ]);
  });

  it('handles removing a parameter', () => {
    render(<QueryParams params={mockParams} onParamsChange={mockOnParamsChange} />);

    const removeButtons = screen
      .getAllByRole('button')
      .filter(button => button.querySelector('svg'));

    fireEvent.click(removeButtons[0]);

    expect(mockOnParamsChange).toHaveBeenCalledWith([mockParams[1]]);
  });

  it('handles parameter key/value changes', () => {
    render(<QueryParams params={mockParams} onParamsChange={mockOnParamsChange} />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'newKey' } });

    expect(mockOnParamsChange).toHaveBeenCalledWith([
      { ...mockParams[0], key: 'newKey' },
      mockParams[1],
    ]);
  });

  it('handles parameter enable/disable toggle', () => {
    render(<QueryParams params={mockParams} onParamsChange={mockOnParamsChange} />);

    const toggleButtons = screen.getAllByRole('switch');
    fireEvent.click(toggleButtons[0]);

    expect(mockOnParamsChange).toHaveBeenCalledWith([
      { ...mockParams[0], enabled: false },
      mockParams[1],
    ]);
  });

  it('adds new parameter on Enter key in last row', () => {
    render(<QueryParams params={mockParams} onParamsChange={mockOnParamsChange} />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.keyDown(inputs[2], { key: 'Enter' });

    expect(mockOnParamsChange).toHaveBeenCalledWith([
      ...mockParams,
      { key: '', value: '', enabled: true },
    ]);
  });

  it('does not add new parameter on Enter key with modifier keys', () => {
    render(<QueryParams params={mockParams} onParamsChange={mockOnParamsChange} />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.keyDown(inputs[2], { key: 'Enter', shiftKey: true });

    expect(mockOnParamsChange).not.toHaveBeenCalled();
  });
});
