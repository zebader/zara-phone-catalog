import { fireEvent, render, screen } from '@testing-library/react';
import { CartFooter } from './CartFooter';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('CartFooter', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders only the continue shopping button when the cart is empty', () => {
    render(<CartFooter totalPrice={0} hasCartItems={false} />);

    expect(screen.getByRole('contentinfo', { name: 'Cart summary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue shopping' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pay' })).not.toBeInTheDocument();
    expect(screen.queryByText('Total 0 EUR')).not.toBeInTheDocument();
  });

  it('renders the total and pay button when the cart has items', () => {
    render(<CartFooter totalPrice={999} hasCartItems />);

    expect(screen.getByText('999 EUR')).toBeInTheDocument();
    expect(screen.getByText('Total 999 EUR')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pay' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue shopping' })).toBeInTheDocument();
  });

  it('navigates to the catalog when continue shopping is clicked', () => {
    render(<CartFooter totalPrice={0} hasCartItems={false} />);

    fireEvent.click(screen.getByRole('button', { name: 'Continue shopping' }));

    expect(mockPush).toHaveBeenCalledWith('/catalog');
  });

});
