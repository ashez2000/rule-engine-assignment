import { Token, TokenType } from './token.js'

export class Lexer {
  private source: string
  private tokens: Token[]
  private start: number
  private current: number

  constructor(source: string) {
    this.source = source
    this.start = 0
    this.current = 0
    this.tokens = []
  }

  scanTokens(): Token[] {
    while (!this.isAtEnd()) {
      this.start = this.current
      this.scanToken()
    }

    this.tokens.push(new Token(TokenType.EOF, '\0'))
    return this.tokens
  }

  private scanToken() {
    const c = this.advance()

    switch (c) {
      case '(':
        this.addToken(TokenType.LEFT_PAREN)
        break

      case ')':
        this.addToken(TokenType.RIGHT_PAREN)
        break

      case '=':
        this.addToken(TokenType.EQUALS)
        break

      case '<':
        this.addToken(TokenType.LESS_THAN)
        break

      case '>':
        this.addToken(TokenType.GREATER_THAN)
        break

      case ' ':
      case '\t':
      case '\r':
      case '\n':
        break

      case "'":
        this.string()
        break

      default:
        if (isDigit(c)) {
          this.number()
        } else if (isAlpha(c)) {
          this.identifier()
        } else {
          throw new Error('lexer: Unexpected character')
        }
    }
  }

  private identifier() {
    while (isAlphaNumeric(this.peek())) this.advance()
    const lexeme = this.source.slice(this.start, this.current)
    this.addToken(keywords.get(lexeme) ?? TokenType.IDENT)
  }

  private number() {
    while (isDigit(this.peek())) this.advance()
    this.addTokenLiteral(TokenType.INT)
  }

  private string() {
    while (this.peek() !== "'" && !this.isAtEnd()) {
      this.advance()
    }

    if (this.isAtEnd()) {
      throw new Error('Unterminated string')
    }

    this.advance()
    this.addTokenLiteral(TokenType.STRING)
  }

  private peek(): string {
    if (this.isAtEnd()) return '\0'
    return this.source[this.current]
  }

  // Consumes current character
  private advance(): string {
    return this.source[this.current++]
  }

  private addToken(type: TokenType) {
    this.addTokenLiteral(type)
  }

  private addTokenLiteral(type: TokenType) {
    let lexeme = ''

    if (type == TokenType.STRING) {
      lexeme = this.source.substring(this.start + 1, this.current - 1)
    } else {
      lexeme = this.source.substring(this.start, this.current)
    }

    this.tokens.push(new Token(type, lexeme))
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length
  }
}

const keywords = new Map<string, TokenType>([
  ['AND', TokenType.AND],
  ['OR', TokenType.OR],
])

function isDigit(c: string): boolean {
  return c >= '0' && c <= '9'
}

function isAlpha(c: string): boolean {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == '_'
}

function isAlphaNumeric(c: string): boolean {
  return isDigit(c) || isAlpha(c)
}
