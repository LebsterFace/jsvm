const A = require("arcsecond"), registers = require("../registers");

const asType = type => value => ({type, value}),
	optionalWhitespace = A.many(A.anyOfString(" \t")),
	whitespace = A.many1(A.anyOfString(" \t")),
	upperOrLower = str => A.choice([A.str(str.toUpperCase()), A.str(str.toLowerCase())]),
	validIdentifier = A.regex(/^[a-z]\w*/i),
	hexLit = A.char("$").chain(() => A.regex(/^[0-9a-f]+/i).map(x => parseInt(x, 16))),
	binLit = A.str("0b").chain(() => A.many1(A.anyOfString("01")).map(x => parseInt(x.join(""), 2))),
	decLit = A.digits.map(x => parseInt(x)),
	literal = A.choice([hexLit, binLit, decLit]).map(asType("LITERAL")),
	address = A.char("&").chain(() => A.regex(/^[0-9a-f]+/i).map(x => parseInt(x, 16))).map(asType("ADDRESS")),
	register = A.choice(registers.map(upperOrLower)).map(x => x.toLowerCase()).map(asType("REGISTER")),
	variable = A.char("!").chain(() => validIdentifier).map(asType("VARIABLE"));

module.exports = {asType, optionalWhitespace, validIdentifier, whitespace, literal, register, variable, address};
