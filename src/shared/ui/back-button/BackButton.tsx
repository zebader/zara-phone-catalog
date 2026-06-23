'use client';
import styles from './BackButton.module.css';
import ArrowLeft from '../../assets/arrow-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();
  return (
    <button className={styles.backButton} onClick={() => router.back()}>
      <Image src={ArrowLeft} alt="back" width={10} height={10} />
      <span className="title-3">back</span>
    </button>
  );
}