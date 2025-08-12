import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  error = false,
  options,
  placeholder,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white';
  const errorStyles = error ? 'border-red-500' : 'border-slate-300';

  return (
    <select
      className={`${baseStyles} ${errorStyles} ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};