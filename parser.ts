import { Stmt, Porogram, Expr, BinaryExpr, NumericLiteral, Identifier } from "./ast.ts";
import { tokenize, Token, TokenType } from "./lexer.ts";\

export default class Parser {

    private tokens: Token[] = [];

    private at () {
        return this.tokens[0] as Token;
    }

    private eat () {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    public produceAST (sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        const program: Program = {
            kind: "Program";
            body: [],
        };

        private not_eof(): boolean {
            return this.tokens[0].type != TokenType.EOF;
        }

        while (not_eof()) {
            program.body.push(this.parse_stmt());
        }

        return program;
    }

    private parse_stmt (): Stmt {
        return this.parse_expr();
    }

    private parse_expr(): expr {
        return this.parse_primary_expr();
    }

    private parse_primary_expr(): Expr {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.at().value } as Identifier;

            default:
                return {} as Stmt;
        }

    }

}