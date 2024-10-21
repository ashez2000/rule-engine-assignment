import { test } from 'node:test'
import { strict as assert } from 'node:assert'

import { createRule, evaluateRule } from './rule_engine/engine.js'

const SAMPLE_RULE_1 = `
((age > 30 AND department = 'Sales') OR
(age < 25 AND department = 'Marketing')) AND
(salary > 50000 OR experience > 5)
`

const SAMPLE_RULE_2 = `
((age > 30 AND department = 'Marketing')) AND 
(salary > 20000 OR experience > 5)
`

const JSON_DATA = `
{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}
`

test('test sample rule 1', () => {
  const ast = createRule(SAMPLE_RULE_1)
  const data = JSON.parse(JSON_DATA)
  assert(ast != null)

  const value = evaluateRule(ast, data)
  assert(value == true)
})

test('test sample rule 2', () => {
  const ast = createRule(SAMPLE_RULE_2)
  const data = JSON.parse(JSON_DATA)
  assert(ast != null)

  const value = evaluateRule(ast, data)
  assert(value == true)
})
