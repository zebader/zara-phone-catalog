import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  addCartItem,
  CartItem,
  CartProvider,
  getCartSnapshot,
  removeCartItem,
  useCart,
} from './CartContext';

const CART_STORAGE_KEY = 'cart';

const mockCartItem: CartItem = {
  id: '1',
  name: 'iPhone 15',
  color: 'Black',
  storage: '128GB',
  price: 999,
  image: 'https://example.com/iphone.jpg',
};

const secondCartItem: CartItem = {
  id: '2',
  name: 'Galaxy S24',
  color: 'White',
  storage: '256GB',
  price: 899,
  image: 'https://example.com/galaxy.jpg',
};

const CartConsumer = () => {
  const { cart, cartCount, addToCart, removeCartItem } = useCart();

  return (
    <div>
      <p data-testid="cart-count">{cartCount}</p>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button type="button" onClick={() => addToCart(mockCartItem)}>
        Add item
      </button>
      <button type="button" onClick={() => removeCartItem(mockCartItem.id)}>
        Remove item
      </button>
    </div>
  );
}

const clearCart = () => {
  getCartSnapshot().forEach((item) => {
    removeCartItem(item.id);
  });
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    clearCart();
  });

  it('throws when useCart is used outside of CartProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<CartConsumer />)).toThrow(
      'useCart must be used within a CartProvider',
    );

    consoleError.mockRestore();
  });

  it('starts with an empty cart', () => {
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>,
    );

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
  });

  it('adds items to the cart and persists them in localStorage', () => {
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]')).toEqual([
      mockCartItem,
    ]);
  });

  it('removes items from the cart and updates localStorage', () => {
    addCartItem(mockCartItem);
    addCartItem(secondCartItem);

    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>,
    );

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');

    fireEvent.click(screen.getByRole('button', { name: 'Remove item' }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]')).toEqual([
      secondCartItem,
    ]);
  });

  it('updates subscribed components when cart items are changed outside React', () => {
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>,
    );

    act(() => {
      addCartItem(mockCartItem);
    });

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();

    act(() => {
      removeCartItem(mockCartItem.id);
    });

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
  });
});
