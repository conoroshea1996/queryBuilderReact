import { FieldConfig, FieldName } from "../types";

export const FIELD_CONFIGS: Record<FieldName, FieldConfig> = {
  name: { value: 'name', type: 'text', operations: ['EQUAL', 'NOT_EQUAL'] },
  id: { value: 'id', type: 'text', operations: ['EQUAL', 'NOT_EQUAL'] },
  device_ip: { value: 'device_ip', type: 'text', operations: ['EQUAL', 'NOT_EQUAL'] },
  amount: { value: 'amount', type: 'amount', operations: ['EQUAL', 'NOT_EQUAL', 'LESS_THAN', 'GREATER_THAN'] },
  installments: { value: 'installments', type: 'number', operations: ['EQUAL', 'NOT_EQUAL', 'LESS_THAN', 'GREATER_THAN'] },
  transaction_state: {
    value: 'transaction_state',
    type: 'enum',
    operations: ['EQUAL', 'NOT_EQUAL'],
    enumOptions: ['SUCCEEDED', 'REJECTED', 'ERROR', 'TIMEOUT', 'CANCELLED', 'FAILED', 'ABORTED']
  }
};



export const COMBINATOR_CONFIGS = ['AND' , 'OR']