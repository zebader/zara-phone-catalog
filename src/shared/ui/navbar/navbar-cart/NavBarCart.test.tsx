import { render, screen } from '@testing-library/react';
import { NavBarCart } from './NavBarCart';
import { useCart } from '@/shared/contexts';

jest.mock('@/shared/contexts', () => ({
  useCart: jest.fn(),
}));

const mockedUseCart = jest.mocked(useCart);

describe('NavBarCart', () => {
  it('renders the cart count and link to the cart page', () => {
    mockedUseCart.mockReturnValue({
      cart: [],
      cartCount: 2,
      addToCart: jest.fn(),
      removeCartItem: jest.fn(),
    });

    render(<NavBarCart />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to cart, 2 items in the cart' }),
    ).toHaveAttribute('href', '/cart');
    expect(screen.getByRole('img', { name: 'Cart with items' })).toBeInTheDocument();
  });

  it('renders zero items when the cart is empty', () => {
    mockedUseCart.mockReturnValue({
      cart: [],
      cartCount: 0,
      addToCart: jest.fn(),
      removeCartItem: jest.fn(),
    });

    render(<NavBarCart />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to cart, 0 items in the cart' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Empty cart' })).toBeInTheDocument();
  });
});
