import { Token } from './token.js'

/** Root Ast for a rule */
export abstract class Expr {
  abstract accept<T>(visitor: Visitor<T>): T
}

/** Visitor patterns for all Expr varients */
export interface Visitor<T> {
  visitIdentExpr(expr: Ident): T
  visitIntExpr(expr: Int): T
  visitStringExpr(expr: String): T
  visitBinaryExpr(expr: Binary): T
}

/** Ast node for identifiers in rules */
export class Ident extends Expr {
  constructor(public name: Token) {
    super()
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitIdentExpr(this)
  }
}

/** Ast node for integer in rules */
export class Int extends Expr {
  constructor(public name: Token, public value: number) {
    super()
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitIntExpr(this)
  }
}

/** Ast node for string in rules */
export class String extends Expr {
  constructor(public name: Token, public value: string) {
    super()
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitStringExpr(this)
  }
}

/** Ast node for binary expressions in rules */
export class Binary extends Expr {
  constructor(public operator: Token, public left: Expr, public right: Expr) {
    super()
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitBinaryExpr(this)
  }
}
