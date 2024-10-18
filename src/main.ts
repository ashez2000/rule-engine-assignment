import { Lexer } from './rule_engine/lexer.js'

const rule = `
((age > 30 AND department = 'Sales') OR 
(age < 25 AND department = 'Marketing')) AND
(salary > 50000 OR experience > 5)
`

const l = new Lexer(rule)
const tokens = l.scanTokens()

console.log(tokens)
