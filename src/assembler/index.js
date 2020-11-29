const A = require("arcsecond"),
	{inspect} = require("util"),
	registers = require("../registers"),
	instructions = require("../instructions"),
	instruction = require("./instructions"),
	definition = require("./definition"),
	label = require("./label");

const deepLog = obj => console.log(inspect(obj, {depth: Infinity, colors: true}));

const res = A.many(A.choice([label, definition, instruction])).run(`
start:
    inc r1
jmp start
`.trim());

if (res.error) throw res.error;

const AST = res.result,
    result = [],
	variables = {},
	labels = {};

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
			const A = calcValue(value.a),
				B = calcValue(value.b);
			switch (value.op.value) {
				case "+":
					return A + B;
				case "-":
					return A - B;
				case "/":
					return A / B;
				case "*":
					return A * B;
			}
		}
	}

	return value;
}

let programSize = 0;

deepLog(AST);

for (let {type, value} of AST) {
	switch (type) {
		case "DEFINITION":
			variables[value.name.value] = calcValue(value.value);
			break;
		case "LABEL":
			labels[value] = programSize;
			break;
		default:
			result.push(instructions[value.instruction], ...value.args.map(calcValue));
			break;
	}
}

deepLog(result.map(byte => Math.abs(Math.floor(byte % 0xffff))));
