import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: React.ReactElement;
  type?: 'button' | 'submit' | 'reset'; 
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, variant, size, disabled, icon, type }) => {
  const buttonClasses = `button ${className} ${variant ? `button-${variant}` : ''} ${size ? `button-${size}` : ''} ${disabled ? 'button-disabled' : ''}`;

  return (
    <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {icon && <span className="button-icon">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;