'use client';
import { useState } from 'react';
import styles from './SearchBar.module.css';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchBar = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [searchQuery, setSearchQuery] = useState(search ?? '');

  const handleSearch = useDebouncedCallback((value) => {
    replace(`/catalog?search=${value}`);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  }

  const handleClear = () => {
    setSearchQuery('');
    replace(`/catalog`);
  };

  return (
    <div className={styles.container}>
      <input onChange={handleChange} value={searchQuery ?? ''} id="search-input" className={styles.searchInput + ' ' + 'text-4'} type="search" placeholder="Search for a smartphone..." />
      {searchQuery && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          type="button"
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
}