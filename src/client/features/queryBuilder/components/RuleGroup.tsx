import { useFieldArray, useFormContext } from 'react-hook-form';
import { getError, isGroup, newGroup, newRule } from '../utils/helpers';
import { RuleComponent } from './RuleComponent';
import { COMBINATOR_CONFIGS } from '../config/fieldConfigs';
import { Button } from '../../../components/Buttons/Index';

interface RuleGroupProps {
  name: string;
  onRemove?: () => void;
  depth: number;
}

export function RuleGroup({ name, onRemove, depth }: RuleGroupProps) {
  const { control, register, watch, formState: { errors } } = useFormContext();
  const isRoot = depth === 0;

  const fieldPath = name === "" ? "conditions" : `${name}.conditions`;
  const combinatorPath = name === "" ? "combinator" : `${name}.combinator`;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldPath,
    rules: {
      validate: (value) =>
        (value && value.length > 0) || 'A group must have at least one rule or sub-group.',
    },
  });
  const currentCombinator = watch(combinatorPath);

  const groupError = getError(fieldPath, errors)?.root?.message;
  const groupHasError = !!groupError;

  return (
    <section
      className={`rounded-2xl border p-5 shadow-sm space-y-5 ${groupHasError ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-white'}`}
      data-testid={`rule-group-depth-${depth}`}
      data-depth={depth}
    >
      <header className="flex items-center justify-between gap-4 flex-wrap">
        {groupHasError && (
          <p
            className="text-red-500"
            role="alert"
            data-testid={`group-error-depth-${depth}`}
          >
            Your adding an empty group please remove or add atleast one field
          </p>
        )}

        <div className="flex items-center flex-wrap gap-3">
          <span className="text-sm font-medium text-gray-700">
            {isRoot ? 'Match' : 'Group match'}
          </span>

          <div
            className="inline-flex rounded-lg border border-gray-300 overflow-hidden bg-white"
            role="group"
            data-testid={`combinator-group-depth-${depth}`}
          >
            {COMBINATOR_CONFIGS.map((c) => (
              <label
                key={c}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${currentCombinator === c
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                data-testid={`combinator-${c.toLowerCase()}-depth-${depth}`}
              >
                <input
                  type="radio"
                  value={c}
                  {...register(combinatorPath)}
                  className="hidden"
                />
                {c}
              </label>
            ))}
          </div>

          <span className="text-sm text-gray-500">
            of the following conditions
          </span>
        </div>

        {!isRoot && onRemove && (
          <Button
            type="button"
            onClick={onRemove}
            data-testid={`remove-group-depth-${depth}`}
          >
            Remove group ✕
          </Button>
        )}
      </header>

      <div className="space-y-3" data-testid={`group-children-depth-${depth}`}>
        {fields.map((field, index) => {
          const itemPath = `${fieldPath}.${index}`;

          return (
            <div key={field.id} data-testid={`group-item-depth-${depth}-index-${index}`}>
              {isGroup(field) ? (
                <RuleGroup
                  name={itemPath}
                  depth={depth + 1}
                  onRemove={() => remove(index)}

                />
              ) : (
                <RuleComponent
                  name={itemPath}
                  depth={depth}
                  index={index}
                  onRemove={() => remove(index)}
                />
              )}
            </div>
          );
        })}
      </div>

      <footer className="flex items-center gap-3 pt-2" data-testid={`group-footer-depth-${depth}`}>
        <Button
          type="button"
          variant='secondary'
          onClick={() => append(newRule())}
          data-testid={`add-rule-depth-${depth}`}
        >
          + Rule
        </Button>

        <Button
          type="button"
          variant='primary'
          onClick={() => append(newGroup())}
          data-testid={`add-group-depth-${depth}`}
        >
          + Group
        </Button>
      </footer>
    </section>
  );
}