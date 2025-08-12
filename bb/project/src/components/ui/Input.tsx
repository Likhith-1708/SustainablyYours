import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  error = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors';
  const errorStyles = error ? 'border-red-500' : 'border-slate-300';

  return (
    <input
      className={`${baseStyles} ${errorStyles} ${className}`}
      {...props}
    />
  );
};