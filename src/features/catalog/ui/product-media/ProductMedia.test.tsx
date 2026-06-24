import { fireEvent, render, screen } from '@testing-library/react';
import { ProductMedia } from './ProductMedia';
import { useCart } from '@/shared/contexts';

const mockPush = jest.fn();

jest.mock('@/shared/contexts', () => ({
  useCart: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockedUseCart = jest.mocked(useCart);

const defaultProps = {
  id: '1',
  name: 'iPhone 15',
  basePrice: 999,
  colorOptions: [
    {
      name: 'Black',
      hexCode: '#000000',
      imageUrl: 'https://example.com/black.jpg',
    },
    {
      name: 'White',
      hexCode: '#ffffff',
      imageUrl: 'https://example.com/white.jpg',
    },
  ],
  storageOptions: [
    { capacity: '128GB', price: 999 },
    { capacity: '256GB', price: 1099 },
  ],
};

describe('ProductMedia', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockedUseCart.mockReturnValue({
      cart: [],
      cartCount: 0,
      addToCart: jest.fn(),
      removeCartItem: jest.fn(),
    });
  });

  it('renders product information with the first color selected and add to cart disabled', () => {
    render(<ProductMedia {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'iPhone 15' })).toBeInTheDocument();
    expect(screen.getByText('From 999 EUR')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'iPhone 15, Black' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeDisabled();
  });

  it('updates the selected color when a color option is clicked', () => {
    render(<ProductMedia {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'White' }));

    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'iPhone 15, White' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'White' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('updates the price when a storage option is selected', () => {
    render(<ProductMedia {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: '256GB storage' }));

    expect(screen.getByText('From 1099 EUR')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '256GB storage' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeEnabled();
  });

  it('adds the selected product to the cart and navigates to the cart page', () => {
    const addToCart = jest.fn();

    mockedUseCart.mockReturnValue({
      cart: [],
      cartCount: 0,
      addToCart,
      removeCartItem: jest.fn(),
    });

    render(<ProductMedia {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: '128GB storage' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));

    expect(addToCart).toHaveBeenCalledWith({
      id: '1',
      name: 'iPhone 15',
      color: 'Black',
      storage: '128GB',
      price: 999,
      image: 'https://example.com/black.jpg',
    });
    expect(mockPush).toHaveBeenCalledWith('/cart');
  });
});
