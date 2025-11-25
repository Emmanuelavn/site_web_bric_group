import React from 'react';

// Very small, accessible Select wrapper used where full Radix UI isn't required.
export function Select({ children, value, onChange, className }) {
  return (
    <select value={value} onChange={onChange} className={className}>
      {children}
    </select>
  );
}

export function SelectTrigger(props) {
  return <div {...props} />;
}

export function SelectValue(props) {
  return <div {...props} />;
}

export function SelectContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export default Select;
