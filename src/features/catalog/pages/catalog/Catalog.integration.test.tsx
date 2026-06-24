import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { Catalog } from './Catalog';
import { getPhoneProducts } from '@/shared/services/api';
import { PhoneProduct } from '@/shared/types/api';

const mockProducts: Array<PhoneProduct> = [
  {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 15',
    basePrice: 999,
    imageUrl: 'https://example.com/iphone.jpg',
  },
  {
    id: '2',
    brand: 'Samsung',
    name: 'Galaxy S24',
    basePrice: 899,
    imageUrl: 'https://example.com/galaxy.jpg',
  },
];

jest.mock('@/shared/services/api', () => ({
  getPhoneProducts: jest.fn(),
}));

const mockGetPhoneProducts = jest.mocked(getPhoneProducts);
const mockReplace = jest.fn();

let searchParamValue: string | null = null;

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === 'search' ? searchParamValue : null),
  }),
}));

function CatalogPageSimulator({ initialSearch = '' }: { initialSearch?: string }) {
  const [search, setSearch] = useState(initialSearch);
  const [catalogElement, setCatalogElement] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    mockReplace.mockImplementation((url: string) => {
      const urlObject = new URL(url, 'http://localhost');
      setSearch(urlObject.searchParams.get('search') ?? '');
    });
  }, []);

  useEffect(() => {
    searchParamValue = search || null;

    let cancelled = false;

    Catalog({ searchParams: Promise.resolve({ search }) }).then((element) => {
      if (!cancelled) {
        setCatalogElement(element);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [search]);

  if (!catalogElement) {
    return null;
  }

  return catalogElement;
}

describe('Catalog integration', () => {
  beforeEach(() => {
    searchParamValue = null;
    mockReplace.mockReset();
    mockGetPhoneProducts.mockReset();
  });

  it('renders the full product list when the user enters the catalog', async () => {
    mockGetPhoneProducts.mockResolvedValue(mockProducts);

    render(<CatalogPageSimulator />);

    await waitFor(() => {
      expect(screen.getByText('2 Results')).toBeInTheDocument();
    });

    expect(screen.getByLabelText('Phone catalog')).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(mockGetPhoneProducts).toHaveBeenCalledWith({ search: '' });
  });

  it('updates the url and product list when the user searches', async () => {
    mockGetPhoneProducts.mockImplementation(async ({ search } = {}) => {
      if (search === 'iphone') {
        return [mockProducts[0]];
      }

      return mockProducts;
    });

    render(<CatalogPageSimulator />);

    await waitFor(() => {
      expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByRole('searchbox', { name: 'Search for a smartphone' }),
      { target: { value: 'iphone' } },
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/catalog?search=iphone');
    }, { timeout: 1000 });

    await waitFor(() => {
      expect(screen.getByText('1 Results')).toBeInTheDocument();
    });

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.queryByText('Galaxy S24')).not.toBeInTheDocument();
    expect(mockGetPhoneProducts).toHaveBeenCalledWith({ search: 'iphone' });
  });

  it('shows an empty state when the search has no matches', async () => {
    mockGetPhoneProducts.mockImplementation(async ({ search } = {}) => {
      if (search === 'nokia') {
        return [];
      }

      return mockProducts;
    });

    render(<CatalogPageSimulator />);

    await waitFor(() => {
      expect(screen.getByText('2 Results')).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByRole('searchbox', { name: 'Search for a smartphone' }),
      { target: { value: 'nokia' } },
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/catalog?search=nokia');
    }, { timeout: 1000 });

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('No products found');
    });

    expect(screen.getByText('0 Results')).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Products' })).not.toBeInTheDocument();
  });
});
