"use client";

import { ColorOption,StorageOption } from '@/shared/types/api';
import styles from './ProductMedia.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useCart } from '@/shared/contexts';

type ProductMediaProps = {
  id: string;
  name: string;
  colorOptions: Array<ColorOption>;
  basePrice: number;
  storageOptions: Array<StorageOption>;
}
type ProductSelection = {
  storage: StorageOption["capacity"];
  color: ColorOption["name"];
  image: ColorOption["imageUrl"];
  price: StorageOption["price"];
}

export const ProductMedia = ({ colorOptions, name, basePrice, storageOptions, id }: ProductMediaProps) => {
  const [selection, setSelection] = useState<ProductSelection>({
    storage: "",
    color: colorOptions[0]?.name ?? "",
    image: colorOptions[0]?.imageUrl ?? "",
    price: basePrice,
  });

  const router = useRouter();
  const { addToCart } = useCart();

  const isAddButtonDisabled = selection.color === "" || selection.storage === "";

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      color: selection.color,
      storage: selection.storage,
      price: selection.price,
      image: selection.image,
    });
  };

  const handleAddButtonClick = () => {
    if (isAddButtonDisabled) return;
    handleAddToCart();
    router.push(`/cart`);
  }

  const handleColorClick = (option: ColorOption) => {
    setSelection((prev) => ({
      ...prev,
      color: option.name,
      image: option.imageUrl,
    }));
  }

  const handleStorageClick = (option: StorageOption) => {
    setSelection((prev) => ({
      ...prev,
      storage: option.capacity,
      price: option.price,
    }));
  }

  return (
    <div className={styles.mediaContainer}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={selection.image} alt={`${name}, ${selection.color}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <div className={styles.mediaContent}>
        <div className={styles.mediaContentTitle}>
          <h1 className="title-1">{name}</h1>
          <p className="title-2">{`From ${selection.price} EUR`}</p>

        </div>
        <div className={styles.mediaContentStorage} role="group" aria-labelledby="storage-label">
          <p id="storage-label" className="title-3">Storage. How much space do you need?</p>
          <div className={styles.mediaContentStorageItems}>
            {storageOptions.map((option) => (
              <button
                key={option.capacity}
                type="button"
                className={`${styles.mediaContentStorageItem} ${selection.storage === option.capacity ? styles.selected :''}`}
                onClick={() => handleStorageClick(option)}
                aria-label={`${option.capacity} storage`}
                aria-pressed={selection.storage === option.capacity}
              >
                <p className="title-3">{option.capacity}</p>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.mediaContentColor} role="group" aria-labelledby="color-label">
          <p id="color-label" className="title-3">Color. Pick your favourite.</p>
          <div className={styles.mediaContentColorItems}>
            <div className={styles.mediaContentColorItemsButtons}>
              {colorOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  style={{ backgroundColor: option.hexCode }}
                  className={`${styles.mediaContentColorItem} ${selection.color === option.name ? styles.selected :''}`}
                  onClick={() => handleColorClick(option)}
                  aria-label={option.name}
                  aria-pressed={selection.color === option.name}
                ></button>
              ))}
            </div>
            <p className="text-1" aria-live="polite">{selection.color}</p>
          </div>
        </div>
        <div className={styles.mediaContentAddButton}>
          <Button onClick={handleAddButtonClick} fullWidth={true} label="Add to cart" disabled={isAddButtonDisabled}/>
        </div>
      </div>
    </div>
  );
};