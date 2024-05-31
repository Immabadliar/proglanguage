import Parser from "./frontend/parser.ts";
import { evaluate } from './runtime/interpreter.ts';


repl();

function repl() {
    const parser = new Parser();
    console.log("Repl v0.1");

    while (true) {
        const input = prompt("> ");
        if (!input || input.includes("exit")) {
            Deno.exit(1);
        }

        cosnt program = parser.produceAST(input);
        console.log(program);

        cosnt result = evaluate(program);
    }
}