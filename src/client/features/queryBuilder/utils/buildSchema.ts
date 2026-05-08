import { ConditionGroup, BackendQuery } from '../types';
import { isGroup, isRule } from './helpers';

export function buildSchema(query: ConditionGroup): BackendQuery {
  return {
    combinator: query.combinator,
    conditions: buildConditions(query)
  };
}

function buildConditions(group: ConditionGroup): any[] {
  return group.conditions.map(item => {
    if (isRule(item)) {
      return {
        fieldName: item.fieldName || '',
        operation: item.operation,
        value: item.value
      };
    }
    if (isGroup(item)) {
      return {
        combinator: item.combinator,
        subConditions: buildConditions(item)
      };
    }
    return null;
  }).filter(Boolean);
}