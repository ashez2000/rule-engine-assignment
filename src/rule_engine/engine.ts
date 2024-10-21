import { Binary, Expr } from './ast.js'
import { Eval } from './evaluator.js'
import { Lexer } from './lexer.js'
import { Parser } from './parser.js'
import { Token, TokenType } from './token.js'

/** Create new rule from string */
export function createRule(rule: string) {
  const l = new Lexer(rule)
  const tokens = l.scanTokens()
  const parser = new Parser(tokens)
  return parser.parse()
}

/**
 * evaluateRule evaluates the rule with provided data
 */
export function evaluateRule(rule: Expr, data: any) {
  const m = new Map()
  for (const k of Object.keys(data)) {
    m.set(k, data[k])
  }

  const e = new Eval(m)
  return e.eval(rule)
}

/**
 * combineRules combines all rules using AND
 * combineRules([A, B, C]) will result in (A AND B AND C)
 * where A, B, C are rules (Expr)
 *
 * NOTE: Temporary implementation
 */
export function combineRules(rules: Expr[]): Expr {
  if (rules.length <= 1) {
    throw new Error('Provide aleast two rules')
  }

  let l = rules[0]
  for (const r of rules) {
    l = new Binary(new Token(TokenType.AND, 'AND'), l, r)
  }

  return l
}
