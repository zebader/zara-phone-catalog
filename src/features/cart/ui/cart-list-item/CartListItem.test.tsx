import { fireEvent, render, screen } from '@testing-library/react';
import { CartListItem } from './CartListItem';
import { useCart } from '@/shared/contexts';

jest.mock('@/shared/contexts', () => ({
  useCart: jest.fn(),
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

describe('CartListItem', () => {
  it('renders the product details', () => {
    mockedUseCart.mockReturnValue({
      cart: [],
      cartCount: 0,
      addToCart: jest.fn(),
      removeCartItem: jest.fn(),
    });

    render(<CartListItem {...mockCartItem} />);

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('128GB | Black')).toBeInTheDocument();
    expect(screen.getByText('999 EUR')).toBeInTheDocument();
    expect(screen.getByLabelText('Product image for iPhone 15')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove iPhone 15' })).toBeInTheDocument();
  });

  it('calls removeCartItem with the item id when remove is clicked', () => {
    const removeCartItem = jest.fn();

    mockedUseCart.mockReturnValue({
      cart: [],
      cartCount: 0,
      addToCart: jest.fn(),
      removeCartItem,
    });

    render(<CartListItem {...mockCartItem} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove iPhone 15' }));

    expect(removeCartItem).toHaveBeenCalledWith('1');
  });

  it('does not render the image when image is not provided', () => {
    mockedUseCart.mockReturnValue({
      cart: [],
      cartCount: 0,
      addToCart: jest.fn(),
      removeCartItem: jest.fn(),
    });

    render(<CartListItem {...mockCartItem} image="" />);

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
