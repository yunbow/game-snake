import styles from './Text.module.css';

interface TextProps {
  children: React.ReactNode;
  variant?: 'title' | 'score' | 'instruction' | 'gameOver';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'instruction',
  className = '',
}) => {
  const baseClass = styles.text;
  const variantClass = styles[variant] || '';
  const combinedClass = `${baseClass} ${variantClass} ${className}`.trim();

  if (variant === 'title') {
    return <h1 className={combinedClass}>{children}</h1>;
  }

  if (variant === 'gameOver') {
    return <h2 className={combinedClass}>{children}</h2>;
  }

  return <p className={combinedClass}>{children}</p>;
};