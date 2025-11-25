import React from 'react';

export function Checkbox({ checked, onChange, className, ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={className}
      {...props}
    />
  );
}

export default Checkbox;
