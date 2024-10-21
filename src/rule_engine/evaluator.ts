import { Binary, Expr, Ident, Int, String, Visitor } from './ast.js'
import { TokenType } from './token.js'

export class Eval implements Visitor<any> {
  constructor(private state: Map<string, any>) {}

  eval(e: Expr) {
    return e.accept(this)
  }

  visitIntExpr(expr: Int) {
    return expr.value
  }

  visitIdentExpr(expr: Ident) {
    const value = this.state.get(expr.name.literal)
    if (value == undefined) {
      throw new Error(`eval: ${expr.name.literal} undefined`)
    }

    return value
  }

  visitStringExpr(expr: String) {
    return expr.value
  }

  visitBinaryExpr(expr: Binary): any {
    let op = expr.operator
    let l = this.eval(expr.left)
    let r = this.eval(expr.right)

    // TODO: operands type check
    switch (op.type) {
      case TokenType.AND:
        return l && r
      case TokenType.OR:
        return l || r
      case TokenType.EQUALS:
        return l == r
      case TokenType.LESS_THAN:
        return l < r
      case TokenType.GREATER_THAN:
        return l > r
    }

    throw new Error(`Invalid opeartor`)
  }
}
