const A = require("arcsecond"),
	{inspect} = require("util"),
	{asType, optionalWhitespace, literal, register, variable, address} = require("./common"),
	expression = require("./expressions");

const deepLog = obj => console.log(inspect(obj, {depth: Infinity, colors: true}));
const lit = A.choice([expression, variable, literal]),
	  addr = A.choice([address, A.char("&").chain(() => expression)]);


const mov_lit_reg = A.coroutine(function*() {
	yield A.str("mov");
	yield optionalWhitespace;
	const arg1 = yield lit;
	yield optionalWhitespace;
	const arg2 = yield register;
	yield A.optionalWhitespace;
	return asType("INSTRUCTION")({
		instruction: "MOV_LIT_REG",
		args: [arg1, arg2]
	});
});

deepLog(mov_lit_reg.run("mov $12 acc"));
