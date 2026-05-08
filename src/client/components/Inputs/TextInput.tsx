import React, { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={`
          w-full rounded-lg border bg-white px-3 py-2
          text-sm placeholder:text-gray-400
          transition-colors
          focus:outline-none focus:ring-2 focus:border-transparent
          disabled:bg-gray-100 disabled:text-gray-400
          disabled:cursor-not-allowed

          ${
            error
              ? `
                border-red-300 text-red-700
                placeholder:text-red-300
                focus:ring-red-500
              `
              : `
                border-gray-300 text-gray-700
                focus:ring-blue-500
              `
          }

          ${className}
        `}
      />
    );
  }
);