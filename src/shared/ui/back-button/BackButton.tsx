'use client';
import styles from './BackButton.module.css';
import ArrowLeft from '../../assets/arrow-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();
  return (
    <button type="button" className={styles.backButton} onClick={() => router.back()} aria-label="Go back to the previous page">
      <Image src={ArrowLeft} alt="" width={10} height={10} aria-hidden="true" />
      <span className="title-3">back</span>
    </button>
  );
}