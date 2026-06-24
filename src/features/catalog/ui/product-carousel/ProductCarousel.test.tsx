import { render, screen } from '@testing-library/react';
import { ProductCarousel } from './ProductCarousel';
import { PhoneProduct } from '@/shared/types/api';

const mockProduct: PhoneProduct = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  imageUrl: 'https://example.com/iphone.jpg',
};

describe('ProductCarousel', () => {
  it('renders a message when there are no products', () => {
    render(<ProductCarousel products={[]} title="Similar items" />);

    expect(screen.getByRole('status')).toHaveTextContent('No products available');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders the title and product cards when products are provided', () => {
    render(<ProductCarousel products={[mockProduct]} title="Similar items" />);

    expect(screen.getByRole('heading', { name: 'Similar items' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Similar items' })).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('999 EUR')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View details for iPhone 15' }),
    ).toHaveAttribute('href', '/catalog/1');
  });

});
