const A = require("arcsecond"),
	registers = require("../registers"),
	instructions = require("../instructions"),
	instruction = require("./instructions"),
	definition = require("./definition"),
	label = require("./label");

module.exports = assembly => {
	const res = A.many(A.choice([label, definition, instruction])).run(assembly.trim());
	if (res.error) throw res.error;

	const AST = res.result,
		result = [],
		variables = {};

	function calcValue({type, value}) {
		switch (type) {
			case "REGISTER": {
				if (!registers.includes(value)) throw `Unknown register '${value}'`;
				return registers.indexOf(value) - 1;
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

	for (let {type, value} of AST) {
		switch (type) {
			case "DEFINITION":
				variables[value.name.value] = calcValue(value.value);
				break;
			case "LABEL":
				variables[value] = programSize;
				break;
			case "INSTRUCTION":
				result.push(instructions[value.instruction].opcode, ...value.args.map(calcValue));
				programSize += instructions[value.instruction].size + 1;
				break;
		}
	}

	return result.map(byte => Math.abs(Math.floor(byte % 0xffff)));
};
