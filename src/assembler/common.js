const A = require("arcsecond");
const asType = type => value => ({type, value});

const optionalWhitespace = A.many(A.anyOfString(" \t")),
	whitespace = A.many1(A.anyOfString(" \t")),
	upperOrLower = str => A.choice([A.str(str.toUpperCase()), A.str(str.toLowerCase())]);

const hexLit = A.char("$").chain(() => A.regex(/^[0-9a-f]+/i).map(x => parseInt(x, 16))),
	binLit = A.str("0b").chain(() => A.many1(A.anyOfString("01")).map(x => parseInt(x.join(""), 2))),
	decLit = A.digits.map(x => parseInt(x)),
	literal = A.choice([hexLit, binLit, decLit]).map(asType("LITERAL"));

const address = A.char("&").chain(() => A.regex(/^[0-9a-f]+/i).map(x => parseInt(x, 16))).map(asType("ADDRESS"));

const registers = require("../registers"),
	register = A.choice(registers.map(upperOrLower)).map(x => x.toLowerCase()).map(asType("REGISTER"));

const variable = A.char("!").chain(() => A.letters).map(asType("VARIABLE"));

module.exports = {asType, optionalWhitespace,whitespace, literal, register, variable, address};
