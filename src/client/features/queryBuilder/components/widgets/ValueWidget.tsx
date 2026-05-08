import { FieldName, RuleValue } from '../../types';
import { Input } from '../../../../components/Inputs/TextInput';
import { FIELD_CONFIGS } from '../../config/fieldConfigs';
import { WIDGET_REGISTRY } from '.';
import { forwardRef } from 'react';

interface ValueWidgetProps {
  fieldName: FieldName | '';
  value: RuleValue;
  onChange: (value: RuleValue) => void;
  error?: boolean;
  'data-testid'?: string;
}

export const ValueWidget = forwardRef<HTMLInputElement | HTMLSelectElement, ValueWidgetProps>(
  ({ fieldName, value, onChange, error, 'data-testid': testId }, ref) => {
    if (!fieldName) {
      return (
        <Input
          type="text"
          aria-label="Select a field first"
          disabled
          placeholder="Select a field first"
          data-testid={testId}
        />
      );
    }

    const config = FIELD_CONFIGS[fieldName];
    const Widget = WIDGET_REGISTRY[config.type];

    if (config.type === 'enum') {
      return <Widget ref={ref} value={value as string} onChange={onChange} fieldName={fieldName} data-testid={testId} error={error} />;
    }

    return <Widget ref={ref} value={value} onChange={onChange} data-testid={testId} error={error} />;
  }
);