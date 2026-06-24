import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { PhoneProduct } from '@/shared/types/api';

const mockProduct: PhoneProduct = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  imageUrl: 'https://example.com/iphone.jpg',
};

describe('ProductCard', () => {
  it('renders the product details and link to the catalog page', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('999 EUR')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View details for iPhone 15' }),
    ).toHaveAttribute('href', '/catalog/1');
  });

  it('uses a fallback label when the product name is missing', () => {
    render(
      <ProductCard
        product={{
          ...mockProduct,
          name: undefined as unknown as string,
        }}
      />,
    );

    expect(
      screen.getByRole('link', { name: 'View details for product' }),
    ).toBeInTheDocument();
  });

  it('does not render the image when imageUrl is not provided', () => {
    render(
      <ProductCard
        product={{
          ...mockProduct,
          imageUrl: '',
        }}
      />,
    );

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
