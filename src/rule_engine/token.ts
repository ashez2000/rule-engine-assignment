export enum TokenType {
  AND = 'AND',
  OR = 'OR',
  EOF = 'EOF',
  INT = 'INT',
  LEFT_PAREN = 'LEFT_PAREN',
  RIGHT_PAREN = 'RIGHT_PAREN',
  IDENT = 'IDENT',
  STRING = 'STRING',
  EQUALS = 'EQUALS',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN = 'GREATER_THAN',
}

export class Token {
  constructor(public type: TokenType, public literal: string) {}
}
