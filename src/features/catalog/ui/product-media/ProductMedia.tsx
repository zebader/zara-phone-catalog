"use client";

import { ColorOption,StorageOption } from '@/shared/types/api';
import styles from './ProductMedia.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';
export const ProductMedia = ({ colorOptions, name, basePrice, storageOptions }: { colorOptions: Array<ColorOption>, name: string, basePrice: number, storageOptions: Array<StorageOption> }) => {
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(colorOptions[0]?.name ?? "");
  const [selectedImage, setSelectedImage] = useState<string>(colorOptions[0]?.imageUrl ?? "");
  const [selectedPrice, setSelectedPrice] = useState<number>(basePrice);

  const router = useRouter();

  const isAddButtonDisabled = selectedColor === "" || selectedStorage === "";

  const handleAddButtonClick = () => {
    if (isAddButtonDisabled) return;
    // TODO: Add product to cart
    router.push(`/cart`);
  }
  const handleColorClick = (option: ColorOption) => {
    setSelectedColor(option.name);
    setSelectedImage(option.imageUrl);
  }
  const handleStorageClick = (option: StorageOption) => {
    setSelectedStorage(option.capacity);
    setSelectedPrice(option.price);
  }
  return (
    <div className={styles.mediaContainer}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={selectedImage} alt={name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <div className={styles.mediaContent}>
        <div className={styles.mediaContentTitle}>
          <p className="title-1">{name}</p>
          <p className="title-2">{`From ${selectedPrice} EUR`}</p>

        </div>
        <div className={styles.mediaContentStorage}>
          <p className="title-3">Storage. How much space do you need?</p>
          <div className={styles.mediaContentStorageItems}>
            {storageOptions.map((option) => (
              <button key={option.capacity} className={`${styles.mediaContentStorageItem} ${selectedStorage === option.capacity ? styles.selected :''}`} onClick={() => handleStorageClick(option)}>
                <p className="title-3">{option.capacity}</p>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.mediaContentColor}>
          <p className="title-3">Color. Pick your favourite.</p>
          <div className={styles.mediaContentColorItems}>
            <div className={styles.mediaContentColorItemsButtons}>
              {colorOptions.map((option) => (
                <button key={option.name} style={{ backgroundColor: option.hexCode }} className={`${styles.mediaContentColorItem} ${selectedColor === option.name ? styles.selected :''}`} onClick={() => handleColorClick(option)}></button>
              ))}
            </div>
            <p className="text-1">{selectedColor}</p>
          </div>
        </div>
        <div className={styles.mediaContentAddButton}>
          <Button onClick={handleAddButtonClick} fullWidth={true} label="Añadir" disabled={isAddButtonDisabled}/>
        </div>
      </div>
    </div>
  );
};