import { FetchPhonesParams, PhoneProduct, PhoneProductDetail } from '@/types/api';

const API_BASE_URL = `${process.env.ZARA_API_BASE_URL}`;
const API_KEY = process.env.ZARA_API_KEY || '';

export const  getPhoneProducts = async (params: FetchPhonesParams = {}): Promise<Array< PhoneProduct > > => {
  const { search, limit = 20, offset = 0 } = params;
  
  const queryParams = new URLSearchParams();
  
  if (search) {
    queryParams.append('search', search);
  }
  
  queryParams.append('limit', limit.toString());
  queryParams.append('offset', offset.toString());

  const url = `${API_BASE_URL}/products?${queryParams.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Error al obtener los productos: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const getPhoneProductById = async (id: string): Promise<PhoneProductDetail> => {
    const url = `${API_BASE_URL}/products/${id}`;
  
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      throw new Error(`Error al obtener el producto: ${res.status} ${res.statusText}`);
    }
  
    return res.json();
  }