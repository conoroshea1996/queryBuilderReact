import { Input } from "../../../../components/Inputs/TextInput";
import { forwardRef } from 'react';

interface TextWidgetProps {
  value: string;
  onChange: (value: string) => void;
  'data-testid'?: string;
  error?: boolean;
}

export const TextWidget = forwardRef<HTMLInputElement, TextWidgetProps>(
  ({ value, onChange, 'data-testid': testId, error = false }, ref) => {
    return (
      <Input
        ref={ref}
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter text"
        aria-label="Text value"
        data-testid={testId}
        error={error}
      />
    );
  }
);