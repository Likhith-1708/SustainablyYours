import React from 'react';
import { motion } from 'framer-motion';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children,
  htmlFor,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">*</span>
        )}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};