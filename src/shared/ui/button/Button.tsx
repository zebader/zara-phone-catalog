import styles from './Button.module.css';
import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  label?: string;
}>;

export const Button = ({ children, onClick , fullWidth = false, disabled = false, label = '' }: ButtonProps) => {
  const buttonClasses = `${styles.button} ${fullWidth ? styles.fullWidth : ''} ${disabled ? styles.disabled : ''}`;
  const labelClasses = `${styles.label} ${disabled ? styles.disabled : ''} ${label ? 'title-3' : ''}`;

  return <button className={buttonClasses} onClick={onClick}>{children || <p className={labelClasses}>{label}</p>}</button>;
};