// AmountCurrencyWidget.tsx

import { useEffect } from 'react';
import { Select } from '../../../../components/Inputs/SelectInput';
import { Input } from '../../../../components/Inputs/TextInput';
import { AmountValue } from '../../types';
import { forwardRef } from 'react';

interface AmountCurrencyWidgetProps {
  value: AmountValue;
  onChange: (value: AmountValue) => void;
  'data-testid'?: string;
  error?: boolean;
}

export const AmountCurrencyWidget = forwardRef<HTMLInputElement, AmountCurrencyWidgetProps>(
  ({ value, onChange, 'data-testid': testId, error = false }, ref) => {
    const amount = value?.amount ?? 0;
    const currency = value?.currency ?? 'USD';

    return (
      <div className="flex gap-2" data-testid={testId}>
        <Input
          ref={ref}
          type="number"
          value={amount}
          onChange={(e) =>
            onChange({
              amount: Number(e.target.value),
              currency,
            })
          }
          placeholder="Amount"
          aria-label="Amount"
          error={error}
        />

        <Select
          value={currency}
          onChange={(e) =>
            onChange({
              amount,
              currency: e.target.value,
            })
          }
          className="w-28"
          aria-label="Currency"
          error={error}
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>
    );
  }
);

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];