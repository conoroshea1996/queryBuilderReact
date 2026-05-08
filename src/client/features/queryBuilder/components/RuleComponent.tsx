import { useFormContext } from 'react-hook-form';
import { FieldName } from '../types';
import { ValueWidget } from './widgets/ValueWidget';
import { FIELD_CONFIGS } from '../config/fieldConfigs';
import { getError } from '../utils/helpers';
import { Select } from '../../../components/Inputs/SelectInput';
import { Button } from '../../../components/Buttons/Index';

interface RuleComponentProps {
  name: string;
  onRemove: () => void;
  depth?: number;
  index?: number;
}

export function RuleComponent({
  name,
  onRemove,
  depth = 0,
  index = 0
}: RuleComponentProps) {

  const { register, watch, setValue, formState: { errors } } = useFormContext();

  const selectedField = watch(`${name}.fieldName`) as FieldName;
  const selectedOperation = watch(`${name}.operation`);
  const selectedValue = watch(`${name}.value`);
  const fieldOptions = Object.keys(FIELD_CONFIGS) as FieldName[];
  const operations = selectedField ? FIELD_CONFIGS[selectedField].operations : [];
  const ruleErrors = getError(`${name}`, errors);

  return (
    <div
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      data-testid={`rule-depth-${depth}-index-${index}`}
    >
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">

        {/* FIELD SELECT */}
        <div className="w-full lg:w-1/4">
          <Select
            {...register(`${name}.fieldName`, { required: 'Required' })}
            error={ruleErrors && ruleErrors?.fieldName}
            data-testid={`field-select-depth-${depth}-index-${index}`}
          >
            <option value="">Select field...</option>
            {fieldOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full lg:w-1/4">
          <Select
            {...register(`${name}.operation`, { required: 'Required' })}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-testid={`operation-select-depth-${depth}-index-${index}`}
            error={ruleErrors && ruleErrors.operation}
          >
            <option value="">Select name...</option>
            {operations.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </Select>
        </div>

        {/* VALUE WIDGET */}
        <div className="flex-1 w-full">
          <ValueWidget
            {...register(`${name}.value`, { required: 'Required' })}
            fieldName={selectedField}
            value={selectedValue}
            error={ruleErrors && ruleErrors.value}
            onChange={(val) => setValue(`${name}.value`, val)}
            data-testid={`value-input-depth-${depth}-index-${index}`}
          />
        </div>

        <Button
          type="button"
          onClick={onRemove}
          aria-label="Remove rule"
          data-testid={`remove-rule-depth-${depth}-index-${index}`}
          variant="danger"
        >
          ✕
        </Button>
      </div>

      {ruleErrors && (
        <p
          className="mt-3 text-sm text-red-600"
          data-testid={`rule-error-depth-${depth}-index-${index}`}
        >
          There are some fields missing. Either add the missing values or remove this rule.
        </p>
      )}
    </div>
  );
}