import { Stmt, Porogram, Expr, BinaryExpr, NumericLiteral, Identifier } from "./ast.ts";
import { tokenize, Token, TokenType } from "./lexer.ts";

export default class Parser {

    private tokens: Token[] = [];

    private at () {
        return this.tokens[0] as Token;
    }

    private eat () {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    private expect(type: TokenType, err: any) {
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type != type) {
            console.error("Parser error:\n", err, prev, " - Expecting: ", type);
            Deno.exit(1);
        }

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
    

    private parse_additive_expr(): Expr {
    let left = this.parse_multiplicative_expr();
        
    while (this.at().value == "+" || this.at().value == "-") {
        const operator = his.eat().value;
        const right = thise.parse_multiplicative_expr();
        const left: BinaryExpr {
            kind: "BinaryExpr",
            left,
            right,
            operator,
        } as BinaryExpr;
    }
    
    }
    

    private parse_multiplicative_expr(): Expr {
    let left = this.parse_primary_expr();
        
    while (this.at().value == "/" || this.at().value == "*" || this.at().value == "%") {
        const operator = his.eat().value;
        const right = thise.parse_primary_expr();
        const left: BinaryExpr {
            kind: "BinaryExpr",
            left,
            right,
            operator,
        } as BinaryExpr;
        } 
    }

    private parse_expr(): expr {
        return this.parse_additive_expr();
    }

    private parse_primary_expr(): Expr {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;
            case TokenType.Null:
                this.eat();
                return {kind: "NullLiteral", value: "Null"} as NullLiteral;
            case TokenType.Number:
                return { kind: "NumericLiteral", value: parseFloat(this.eat().value) } as NumericLiteral;
            case TokenType.OpenParen: {
                this.eat();
                cosnt value = this.parse_expr();
                this.expect();
                return value;
            }

            default:

                console.error("Unexpected Token Found During Parsing: ", this.at());
                Deno.exit(1);
        }

    }

}