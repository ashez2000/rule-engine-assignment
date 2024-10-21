import { Binary, Expr, Ident, Int, String } from './ast.js'
import { Token, TokenType } from './token.js'

export class Parser {
  private tokens: TokenIter
  private curToken: Token
  private peekToken: Token

  constructor(tokens: Token[]) {
    this.tokens = new TokenIter(tokens)
    this.curToken = this.tokens.next()
    this.peekToken = this.tokens.next()
  }

  parse() {
    return this.parseExpr(Precedence.LOWEST)
  }

  // pratt parser
  private parseExpr(pred: Precedence): Expr | null {
    if (this.curToken.type == TokenType.EOF) return null

    let left: Expr | null = null

    switch (this.curToken.type) {
      case TokenType.IDENT:
        left = this.parseIdent()
        break
      case TokenType.INT:
        left = this.parseInt()
        break
      case TokenType.STRING:
        left = this.parseString()
        break
      case TokenType.LEFT_PAREN:
        left = this.parseGroup()
        break
      default:
        throw new Error(`parser: Invalid expression`)
    }

    while (pred < (precedence.get(this.peekToken.type) ?? Precedence.LOWEST)) {
      switch (this.peekToken.type) {
        // @ts-ignore
        case TokenType.EQUALS:
        // @ts-ignore
        case TokenType.AND:
        // @ts-ignore
        case TokenType.OR:
        // @ts-ignore
        case TokenType.LESS_THAN:
        // @ts-ignore
        case TokenType.GREATER_THAN:
          // @ts-ignore
          this.nextToken()
          left = this.parseBinary(left!)
          break
      }
    }

    return left
  }

  private parseIdent(): Expr {
    return new Ident(this.curToken)
  }

  private parseInt(): Expr {
    return new Int(this.curToken, parseInt(this.curToken.literal))
  }

  private parseString(): Expr {
    return new String(this.curToken, this.curToken.literal)
  }

  private parseGroup() {
    this.nextToken()
    let expr = this.parseExpr(Precedence.LOWEST)
    this.expectPeek(
      TokenType.RIGHT_PAREN,
      "Expected ')' after grouped expression"
    )
    return expr
  }

  private parseBinary(left: Expr): Expr {
    const op = this.curToken
    this.nextToken()
    const right = this.parseExpr(Precedence.LOWEST)
    return new Binary(op, left, right!)
  }

  //
  // Utils
  //

  private nextToken() {
    this.curToken = this.peekToken
    this.peekToken = this.tokens.next()
  }

  private expectPeek(type: TokenType, message: string) {
    if (this.peekToken.type != type) {
      throw new Error(`parser: ${message}`)
    }
    this.nextToken()
  }
}

enum Precedence {
  LOWEST = 0,
  EQUALS,
  LT_GT,
  OR,
  AND,
}

export const precedence = new Map<TokenType, Precedence>([
  [TokenType.EQUALS, Precedence.EQUALS],
  [TokenType.LESS_THAN, Precedence.LT_GT],
  [TokenType.GREATER_THAN, Precedence.LT_GT],
  [TokenType.OR, Precedence.OR],
  [TokenType.AND, Precedence.AND],
])

// Helper class to iterate over tokens
class TokenIter {
  private cur = 0
  constructor(private tokens: Token[]) {}

  next(): Token {
    if (this.cur == this.tokens.length - 1) {
      return this.tokens[this.tokens.length - 1]
    }

    const tok = this.tokens[this.cur++]
    return tok
  }
}
