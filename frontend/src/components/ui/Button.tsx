import React from 'react';
import { combineClassNames } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      className={combineClassNames(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-outline': variant === 'outline',
          'btn-sm': size === 'sm',
          'btn-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
