export type Combinator = 'AND' | 'OR';
export type Operation = 'EQUAL' | 'NOT_EQUAL' | 'LESS_THAN' | 'GREATER_THAN';

export type FieldName = 'name' | 'id' | 'device_ip' | 'amount' | 'installments' | 'transaction_state';
export type FieldType = 'text' | 'number' | 'amount' | 'enum';

export interface FieldConfig {
  value: string;
  type: FieldType;
  operations: Operation[];
  enumOptions?: string[];
}


export type RuleValue = string | number | { amount: number; currency: string };
export type AmountValue = { amount: number; currency: string };

// === SIMPLE TREE STRUCTURE ===

export interface Rule {
  id: string;
  fieldName: FieldName | '';
  operation: Operation;
  value: any;
}

export interface ConditionGroup {
  id: string;
  combinator: Combinator;
  conditions: (Rule | ConditionGroup)[];
}

// === API OUTPUT TYPE ===

export interface BackendQuery {
  combinator: string;
  conditions: any[];
}