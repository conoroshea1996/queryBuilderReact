import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryBuilder } from '../components/QueryBuilder';
import axios from 'axios';

vi.mock('axios');

describe('QueryBuilder', () => {
  beforeEach(() => {
    (axios.post as any).mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the query builder', () => {
    render(<QueryBuilder />);
    expect(screen.getByTestId('query-builder')).toBeInTheDocument();
  });

  it('renders root group with AND combinator selected by default', () => {
    render(<QueryBuilder />);
    expect(screen.getByTestId('rule-group-depth-0')).toBeInTheDocument();
    expect(screen.getByTestId('combinator-and-depth-0')).toHaveClass('bg-blue-600');
  });

  it('can change combinator to OR', () => {
    render(<QueryBuilder />);
    const orBtn = screen.getByTestId('combinator-or-depth-0');
    fireEvent.click(orBtn);
    expect(orBtn).toHaveClass('bg-blue-600');
    expect(screen.getByTestId('combinator-and-depth-0')).not.toHaveClass('bg-blue-600');
  });

  it('adds a new rule when clicking + Rule', () => {
    render(<QueryBuilder />);
    const addRuleBtn = screen.getByTestId('add-rule-depth-0');
    fireEvent.click(addRuleBtn);

    expect(screen.getByTestId('rule-depth-0-index-0')).toBeInTheDocument();
    expect(screen.getByTestId('field-select-depth-0-index-0')).toBeInTheDocument();
  });

  it('field dropdown contains all 6 fields', () => {
    render(<QueryBuilder />);
    fireEvent.click(screen.getByTestId('add-rule-depth-0'));

    const fieldSelect = screen.getByTestId('field-select-depth-0-index-0');
    const options = Array.from(fieldSelect.querySelectorAll('option')).map(opt => opt.value);

    expect(options).toContain('name');
    expect(options).toContain('id');
    expect(options).toContain('device_ip');
    expect(options).toContain('amount');
    expect(options).toContain('installments');
    expect(options).toContain('transaction_state');
  });

  it('operation dropdown updates based on field selection', () => {
    render(<QueryBuilder />);
    fireEvent.click(screen.getByTestId('add-rule-depth-0'));

    const fieldSelect = screen.getByTestId('field-select-depth-0-index-0');
    const operationSelect = screen.getByTestId('operation-select-depth-0-index-0');

    // Select 'name' (text field)
    fireEvent.change(fieldSelect, { target: { value: 'name' } });
    let options = Array.from(operationSelect.querySelectorAll('option')).map(opt => opt.value);
    expect(options).toEqual(['', 'EQUAL', 'NOT_EQUAL']);

    // Select 'amount' (number field)
    fireEvent.change(fieldSelect, { target: { value: 'amount' } });
    options = Array.from(operationSelect.querySelectorAll('option')).map(opt => opt.value);
    expect(options).toEqual(['', 'EQUAL', 'NOT_EQUAL', 'LESS_THAN', 'GREATER_THAN']);

    // Select 'transaction_state' (enum field)
    fireEvent.change(fieldSelect, { target: { value: 'transaction_state' } });
    options = Array.from(operationSelect.querySelectorAll('option')).map(opt => opt.value);
    expect(options).toEqual(['', 'EQUAL', 'NOT_EQUAL']);
  });

  it('renders correct value widget for each field type', () => {
    render(<QueryBuilder />);
    fireEvent.click(screen.getByTestId('add-rule-depth-0'));

    const fieldSelect = screen.getByTestId('field-select-depth-0-index-0');

    // Text field (name) → text input (testid on input itself)
    fireEvent.change(fieldSelect, { target: { value: 'name' } });
    const textInput = screen.getByTestId('value-input-depth-0-index-0');
    expect(textInput).toHaveAttribute('type', 'text');

    // Number field (installments) → number input (testid on input itself)
    fireEvent.change(fieldSelect, { target: { value: 'installments' } });
    const numberInput = screen.getByTestId('value-input-depth-0-index-0');
    expect(numberInput).toHaveAttribute('type', 'number');

    // Amount field → has container with both amount input and currency select
    fireEvent.change(fieldSelect, { target: { value: 'amount' } });
    const amountContainer = screen.getByTestId('value-input-depth-0-index-0');
    expect(amountContainer.querySelector('input[type="number"]')).toBeInTheDocument();
    expect(amountContainer.querySelector('select')).toBeInTheDocument();

    // Enum field (transaction_state) → select with options (testid on select)
    fireEvent.change(fieldSelect, { target: { value: 'transaction_state' } });
    const enumSelect = screen.getByTestId('value-input-depth-0-index-0');
    expect(enumSelect.tagName).toBe('SELECT');
    const enumOptions = Array.from(enumSelect.querySelectorAll('option')).map(opt => opt.value);
    expect(enumOptions).toContain('SUCCEEDED');
    expect(enumOptions).toContain('REJECTED');
    expect(enumOptions).toContain('FAILED');
  });

  it('adds a nested group when clicking + Group', () => {
    render(<QueryBuilder />);
    const addGroupBtn = screen.getByTestId('add-group-depth-0');
    fireEvent.click(addGroupBtn);

    expect(screen.getByTestId('rule-group-depth-1')).toBeInTheDocument();
    expect(screen.getByText('Group match')).toBeInTheDocument();
  });

  it('removes a rule when clicking remove button', () => {
    render(<QueryBuilder />);
    fireEvent.click(screen.getByTestId('add-rule-depth-0'));

    expect(screen.getByTestId('rule-depth-0-index-0')).toBeInTheDocument();

    const removeBtn = screen.getByTestId('remove-rule-depth-0-index-0');
    fireEvent.click(removeBtn);

    expect(screen.queryByTestId('rule-depth-0-index-0')).not.toBeInTheDocument();
  });

  it('removes a nested group when clicking remove button', () => {
    render(<QueryBuilder />);
    fireEvent.click(screen.getByTestId('add-group-depth-0'));

    expect(screen.getByTestId('rule-group-depth-1')).toBeInTheDocument();

    // The nested group has its own remove button
    const removeBtn = screen.getByTestId('remove-group-depth-1');
    fireEvent.click(removeBtn);

    expect(screen.queryByTestId('rule-group-depth-1')).not.toBeInTheDocument();
  });

  it('submits the form and displays generated JSON', async () => {
    render(<QueryBuilder />);

    // Add a rule
    fireEvent.click(screen.getByTestId('add-rule-depth-0'));

    // Fill out the rule
    const fieldSelect = screen.getByTestId('field-select-depth-0-index-0');
    fireEvent.change(fieldSelect, { target: { value: 'name' } });


    const operationSelect = screen.getByTestId('operation-select-depth-0-index-0');
    fireEvent.change(operationSelect, { target: { value: 'EQUAL' } })

    const valueInput = screen.getByTestId('value-input-depth-0-index-0');
    fireEvent.change(valueInput, { target: { value: 'john' } });

    // Submit
    const submitBtn = screen.getByTestId('submit-button');
    fireEvent.click(submitBtn);

    // Check JSON output appears
    await waitFor(() => {
      expect(screen.getByTestId('payload-display')).toBeInTheDocument();
    });

    // Check JSON content
    const pre = screen.getByTestId('payload-display').querySelector('pre');
    expect(pre).toHaveTextContent('"combinator": "AND"');
    expect(pre).toHaveTextContent('"fieldName": "name"');
    expect(pre).toHaveTextContent('"value": "john"');
  });

  it('resets the form and clears JSON display', async () => {
    render(<QueryBuilder />);

    // Add a rule and submit
    fireEvent.click(screen.getByTestId('add-rule-depth-0'));
    const fieldSelect = screen.getByTestId('field-select-depth-0-index-0');
    fireEvent.change(fieldSelect, { target: { value: 'name' } });
    const operationSelect = screen.getByTestId('operation-select-depth-0-index-0');
    fireEvent.change(operationSelect, { target: { value: 'EQUAL' } })
    const valueInput = screen.getByTestId('value-input-depth-0-index-0');
    fireEvent.change(valueInput, { target: { value: 'john' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('payload-display')).toBeInTheDocument();
    });

    // Reset
    const resetBtn = screen.getByTestId('reset-button');
    fireEvent.click(resetBtn);

    expect(screen.queryByTestId('payload-display')).not.toBeInTheDocument();
    // Root group should be empty (no rules)
    expect(screen.getByTestId('group-children-depth-0').children).toHaveLength(0);
  });
});
