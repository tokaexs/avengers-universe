import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onHoverSound?: () => void;
  onClickSound?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onHoverSound,
  onClickSound,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClickSound) onClickSound();
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`btn-${variant} btn-size-${size} ${className}`}
      onMouseEnter={onHoverSound}
      onClick={handleClick}
      {...props}
    >
      {/* Corner Tech Brackets */}
      <span className="btn-bracket-tl" />
      <span className="btn-bracket-br" />
      
      {/* Laser Sheen Sweep */}
      <span className="btn-sheen" />

      {/* Button Content */}
      <span className="btn-text">
        {children}
      </span>
    </button>
  );
}
