import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label when no children are provided', () => {
    render(<Button onClick={jest.fn()} label="Pay" />);

    expect(screen.getByRole('button', { name: 'Pay' })).toBeInTheDocument();
    expect(screen.getByText('Pay')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} label="Pay" />);

    fireEvent.click(screen.getByRole('button', { name: 'Pay' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} label="Pay" disabled />);

    fireEvent.click(screen.getByRole('button', { name: 'Pay' }));

    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Pay' })).toBeDisabled();
  });

  it('applies the fullWidth class when fullWidth is true', () => {
    render(<Button onClick={jest.fn()} label="Pay" fullWidth />);

    expect(screen.getByRole('button', { name: 'Pay' })).toHaveClass('fullWidth');
  });

  it('applies the outline classes when outline is true', () => {
    render(<Button onClick={jest.fn()} label="Continue shopping" outline />);

    expect(screen.getByRole('button', { name: 'Continue shopping' })).toHaveClass('outline');
    expect(screen.getByText('Continue shopping')).toHaveClass('outlined');
  });
});
