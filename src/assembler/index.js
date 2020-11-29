const A = require("arcsecond"),
	{inspect} = require("util"),
	registers = require("../registers"),
	instructions = require("../instructions"),
	instructionParser = require("./instructions");

const deepLog = obj => console.log(inspect(obj, {depth: Infinity, colors: true}));

const AST = A.many(instructionParser).run(`
!var = 1
mov [!var * 5] r1
!var++
mov [!var * 5] r2
`.trim());

if (AST.error) throw AST.error;

const result = [], variables = {};

function calcValue({type, value}) {
	switch (type) {
        case "REGISTER": {
            if (!registers.includes(value)) throw `Unknown register '${value}'`;
            return registers.indexOf(value) + 1;
        }

        case "VARIABLE": {
            if (typeof variables[value] === "undefined") throw `'!${value}' is not defined`;
            return variables[value];
        }

        case "BINARY_OPERATION": {
            const A = calcValue(value.a), B = calcValue(value.b);
            switch (value.op.value) {
                case "+": return A + B;
                case "-": return A - B;
                case "/": return A / B;
                case "*": return A * B;
            }
        }
    }

	return value;
}


for (let {type, value} of AST.result) {
    if (type === "DEFINITION") {
        variables[value.name.value] = calcValue(value.value);
    } else {
        result.push(instructions[value.instruction], ...value.args.map(calcValue));
    }
}

deepLog(result.map(byte => Math.abs(Math.floor(byte % 0xFFFF))));