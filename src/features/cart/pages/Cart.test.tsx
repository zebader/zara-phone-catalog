import { render, screen } from '@testing-library/react';
import { Cart } from './Cart';
import { useCart } from '@/shared/contexts';

jest.mock('@/shared/contexts', () => ({
  useCart: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockedUseCart = jest.mocked(useCart);

const mockCartItem = {
  id: '1',
  name: 'iPhone 15',
  color: 'Black',
  storage: '128GB',
  price: 999,
  image: 'https://example.com/iphone.jpg',
};

describe('Cart', () => {
  it('renders an empty cart message when there are no items', () => {
    mockedUseCart.mockReturnValue({
      cart: [],
      cartCount: 0,
      addToCart: jest.fn(),
      removeCartItem: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByRole('heading', { name: 'Cart (0)' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Cart is empty');
    expect(screen.queryByRole('button', { name: 'Pay' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue shopping' })).toBeInTheDocument();
  });

  it('renders cart items and the total when the cart has products', () => {
    mockedUseCart.mockReturnValue({
      cart: [mockCartItem],
      cartCount: 1,
      addToCart: jest.fn(),
      removeCartItem: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByRole('heading', { name: 'Cart (1)' })).toBeInTheDocument();
    expect(screen.getByLabelText('Products in the cart')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('128GB | Black')).toBeInTheDocument();
    expect(screen.getByText('Total 999 EUR')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pay' })).toBeInTheDocument();
  });
});
