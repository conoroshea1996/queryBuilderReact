import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryBuilder } from '../../components/QueryBuilder';
import { FIELD_CONFIGS } from '../../config/fieldConfigs';

export interface FillRuleOptions {
  field?: string;
  operation?: string;
  value?: string;
  ruleIndex?: number;
  depth?: number;
}

export class QueryBuilderPage {
  readonly user = userEvent.setup();

  
  render(): this {
    render(<QueryBuilder />);
    return this;
  }

  // ── Getters ─────────────────────────────────────────────
  getFieldSelect(depth = 0, ruleIndex = 0) {
    return screen.getByTestId(`field-select-depth-${depth}-index-${ruleIndex}`);
  }

  getOperationSelect(depth = 0, ruleIndex = 0) {
    return screen.getByTestId(`operation-select-depth-${depth}-index-${ruleIndex}`);
  }

  getValueInput(depth = 0, ruleIndex = 0) {
    return screen.getByTestId(`value-input-depth-${depth}-index-${ruleIndex}`);
  }

  getRuleContainer(depth = 0, ruleIndex = 0) {
    return screen.getByTestId(`rule-depth-${depth}-index-${ruleIndex}`);
  }

  // ── Actions ─────────────────────────────────────────────
  async addRule(depth: number = 0) {
    const buttons = screen.getAllByTestId(/add-rule-depth-/);
    await this.user.click(buttons[depth]);
  }

  async addGroup(depth: number = 0) {
    const buttons = screen.getAllByTestId(/add-group-depth-/);
    await this.user.click(buttons[depth]);
  }

  async removeRule(depth: number = 0, ruleIndex: number = 0) {
    const btn = screen.getByTestId(`remove-rule-depth-${depth}-index-${ruleIndex}`);
    await this.user.click(btn);
  }

  async removeGroup(depth: number = 1) {
    const btn = screen.getByTestId(`remove-group-depth-${depth}`);
    await this.user.click(btn);
  }

  async switchCombinator(type: 'AND' | 'OR', depth: number = 0) {
    const testId = `combinator-${type.toLowerCase()}-depth-${depth}`;
    const element = screen.getByTestId(testId);
    await this.user.click(element);
  }

  async fillRule(options: FillRuleOptions = {}) {
    const {
      field = 'name',
      operation,
      value = 'john',
      ruleIndex = 0,
      depth = 0,
    } = options;

    // Field
    const fieldSelect = this.getFieldSelect(depth, ruleIndex);
    await this.user.selectOptions(fieldSelect, field);

    // Operation (optional)
    if (operation) {
      const opSelect = this.getOperationSelect(depth, ruleIndex);
      await this.user.selectOptions(opSelect, operation);
    }

    // Value
    const valueInput = this.getValueInput(depth, ruleIndex);
    await this.user.clear(valueInput);
    await this.user.type(valueInput, value);
  }

  async submit() {
    await this.user.click(screen.getByTestId('submit-button'));
  }

  async reset() {
    await this.user.click(screen.getByTestId('reset-button'));
  }

  async submitWithRule(options: FillRuleOptions = {}) {
    await this.addRule(options.depth ?? 0);
    await this.fillRule(options);
    await this.submit();
  }
}