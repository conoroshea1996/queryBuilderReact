import { Input } from "../../../../components/Inputs/TextInput";
import { forwardRef } from 'react';

interface NumberWidgetProps {
  value: number;
  onChange: (value: number) => void;
  'data-testid'?: string;
  error?: boolean;
}

export const NumberWidget = forwardRef<HTMLInputElement, NumberWidgetProps>(
  ({ value, onChange, 'data-testid': testId, error = false }, ref) => {
    return (
      <Input
        ref={ref}
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder="Enter number"
        aria-label="Number value"
        data-testid={testId}
        error={error}
      />
    );
  }
);