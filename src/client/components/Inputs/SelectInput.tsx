import { forwardRef, type SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error = false, ...props }, ref) => {
    return (
      <select
        {...props}
        ref={ref} 
        className={`
          w-full rounded-lg border bg-white px-3 py-2
          text-sm transition-colors
          focus:outline-none focus:ring-2 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-300 text-red-700 focus:ring-red-500' : 'border-gray-300 text-gray-700 focus:ring-blue-500'}
          ${className}
        `}
      />
    );
  }
);