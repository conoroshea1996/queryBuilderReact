import { BackendQuery, ConditionGroup } from '../types';
import { RuleGroup } from './RuleGroup';
import { newRoot } from '../utils/helpers';
import { saveRules } from '../api/queryBuilderApi';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { buildSchema } from '../utils/buildSchema';
import { PayloadDisplay } from './PayloadDisplay';
import { Button } from '../../../components/Buttons/Index';

export function QueryBuilder() {
  const methods = useForm<ConditionGroup>({
    defaultValues: newRoot(),
  });
  const { handleSubmit, reset, formState: { isSubmitting } } = methods;
  const [apiError, setApiError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<BackendQuery | null>(null);

  const onSubmit = async (data: ConditionGroup) => {
    setSubmittedData(null);
    setApiError(null);

    try {
      const payload = buildSchema(data);
      await saveRules(data);
      setSubmittedData(payload);
    } catch (err) {
      setApiError(err);
    }
  };

  function handleReset() {
    reset(newRoot());
    setSubmittedData(null);
    setApiError(null);
  }

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6" data-testid="query-builder">
      <header className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Query Builder
        </h1>
      </header>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Query builder form"
          className="space-y-6"
          data-testid="query-builder-form"
        >
          <RuleGroup name={""} depth={0} />

          <div className="flex items-center gap-3" data-testid="form-actions">
            <Button
              type="submit"
              disabled={isSubmitting}
              data-testid="submit-button"
              variant="primary"
            >
              {isSubmitting ? 'Submitting…' : 'Submit Query'}
            </Button>

            <Button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              data-testid="reset-button"
              variant="secondary"
            >
              Reset
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* Payload Display */}
      {submittedData && (
        <div data-testid="payload-display">
          <PayloadDisplay submittedData={submittedData} />
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <p
          className="text-[10px] text-red-500"
          role="alert"
          data-testid="api-error"
        >
          {apiError}
        </p>
      )}
    </main>
  );
}