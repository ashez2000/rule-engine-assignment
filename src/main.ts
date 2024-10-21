import { Eval } from './rule_engine/evaluator.js'
import { Lexer } from './rule_engine/lexer.js'
import { Parser } from './rule_engine/parser.js'

const rule = `'a' = 'b'`

try {
  const l = new Lexer(rule)

  const tokens = l.scanTokens()
  console.log(tokens)

  const parser = new Parser(tokens)
  const expr = parser.parse()
  console.log('res', JSON.stringify(expr, null, 4))
  if (expr) {
    const e = new Eval(new Map())
    console.log(e.eval(expr))
  }
} catch (err) {
  console.log(err)
}
