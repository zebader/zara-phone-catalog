import styles from './Button.module.css';
import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  label?: string;
  outline?: boolean;
}>;

export const Button = ({ children, onClick , fullWidth = false, disabled = false, label = '', outline = false }: ButtonProps) => {
  const buttonClasses = `${styles.button} ${fullWidth ? styles.fullWidth : ''} ${disabled ? styles.disabled : ''} ${outline ? styles.outline : ''}`;
  const labelClasses = `${styles.label} ${disabled ? styles.disabled : ''} ${label ? 'title-3' : ''} ${outline ? styles.outlined : ''}`;

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {children || <span className={labelClasses}>{label}</span>}
    </button>
  );
};