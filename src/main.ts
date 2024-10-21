import { createRule, evaluateRule } from './rule_engine/engine.js'

try {
  const args = process.argv.slice(2)
  const rule = args[0]
  const data = JSON.parse(args[1] ?? '{}')

  const ast = createRule(rule)
  if (ast) {
    const value = evaluateRule(ast, data)
    console.log('result:', value)
  }
} catch (err) {
  console.log(err)
}
