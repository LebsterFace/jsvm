const A = require("arcsecond"),
	{variable, literal, address, asType} = require("./common"),
	expression = require("./expressions");

const lit = A.choice([literal, variable, expression]),
	addr = A.choice([address, A.char("&").chain(() => expression)]);

module.exports = A.choice([
	A.coroutine(function*() {
		const name = yield variable;
		yield A.optionalWhitespace;
        const change = yield A.regex(/^(\+\++|--+)/);
        const changeAmount = (change.length - 1) * (change[0] === "-" ? -1 : 1);
        const value = asType("BINARY_OPERATION")({
            a: name,
            op: asType("OPERATOR")("+"),
            b: asType("LITERAL")(changeAmount)
        });


		yield A.optionalWhitespace;
		return {name, value};
	}),
	A.coroutine(function*() {
		const name = yield variable;
		yield A.optionalWhitespace;
		yield A.char("=");
		yield A.optionalWhitespace;
		const value = yield A.choice([addr, lit]);
		yield A.optionalWhitespace;
		return {name, value};
	})
]).map(asType("DEFINITION"));
