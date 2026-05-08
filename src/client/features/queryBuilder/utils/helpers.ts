import { ConditionGroup, Rule } from "../types";

export const isRule = (item: Rule | ConditionGroup): item is Rule => 'fieldName' in item;

export const isGroup = (item: Rule | ConditionGroup): item is ConditionGroup => 'conditions' in item;

export const newRule = (): Rule => ({ id: crypto.randomUUID(), fieldName: '', operation: 'EQUAL', value: '' });

export const newGroup = (): ConditionGroup => ({ id: crypto.randomUUID(), combinator: 'AND', conditions: [] });

export const newRoot = (): ConditionGroup => ({ id: 'root', combinator: 'AND', conditions: [] });

/// form helper
export const getError = (path: string, errors: {}) => {
  return path.split('.').reduce((obj, key) => obj?.[key], errors)
};