import styles from './CartFooter.module.css';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';

export const CartFooter = ({ totalPrice, hasCartItems }: { totalPrice: number, hasCartItems: boolean }) => {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push('/catalog');
  };

  const handlePay = () => {
    alert('This exercise ends here. Thank you very much for the opportunity and your time!');
  };

  return (
    <footer className={styles.wrapper} aria-label="Cart summary">
      {hasCartItems && (
        <div className={styles.totalPriceTop} aria-live="polite">
          <p className="title-4">Total</p>
          <p className="title-4">{`${totalPrice} EUR`}</p>
        </div>
      )}
      <div className={`${styles.container} ${!hasCartItems ? styles.center : ''}`}>
        <div className={styles.buttonContainer}>
          <Button onClick={handleContinueShopping} fullWidth outline label="Continue shopping" />
        </div>
        {hasCartItems && (
          <div className={styles.paymentContainer}>
            <p className={`${styles.totalPrice} title-4`} aria-live="polite">{`Total ${totalPrice} EUR`}</p>
            <div className={styles.buttonContainer}>
              <Button onClick={handlePay} fullWidth label="Pay" />
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};