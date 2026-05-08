import { Select } from '../../../../components/Inputs/SelectInput';
import { forwardRef } from 'react';
import { FIELD_CONFIGS } from '../../config/fieldConfigs';

interface EnumWidgetProps {
  value: string;
  onChange: (value: string) => void;
  fieldName: string;
  'data-testid'?: string;
  error?: boolean;
}

export const EnumWidget = forwardRef<HTMLSelectElement, EnumWidgetProps>(
  ({ value, onChange, fieldName, 'data-testid': testId, error = false }, ref) => {
    const config = FIELD_CONFIGS[fieldName as keyof typeof FIELD_CONFIGS];
    const options = config?.enumOptions ?? [];

    return (
      <Select
        ref={ref}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select option"
        data-testid={testId}
        error={error}
      >
        <option value="">Select...</option>

        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
    );
  }
);