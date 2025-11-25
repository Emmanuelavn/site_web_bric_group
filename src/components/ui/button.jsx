import React from 'react';

const Button = React.forwardRef(({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  const variants = {
    primary: 'bg-[#2d7a4b] text-white hover:bg-[#4a9d6f] shadow-md',
    secondary: 'bg-white text-[#2d7a4b] hover:bg-gray-100 border',
    ghost: 'bg-transparent text-[#2d7a4b] hover:bg-[#e8f5e9]'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} transform-gpu hover:-translate-y-0.5 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };