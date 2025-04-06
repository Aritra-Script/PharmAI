import React, { useState, useEffect } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const RippleButton: React.FC<RippleButtonProps> = ({ children, onClick, className }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    onClick && onClick();
  };

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {isRippling && (
        <span
          className="absolute bg-white bg-opacity-30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default RippleButton;
