const A = require("arcsecond"),
	registers = require("../registers"),
	{inspect} = require("util");

const asType = type => value => ({type, value}),
	deepLog = obj => console.log(inspect(obj, {depth: Infinity, colors: true})),
	peek = A.peek.map(String.fromCharCode),
	lineFeed = A.many1(A.char("\n")),
	optionalWhitespace = A.many(A.anyOfString(" \t")),
	upperOrLower = str => A.choice([A.str(str.toUpperCase()), A.str(str.toLowerCase())]);

const register = A.choice(registers.map(upperOrLower)).map(x => x.toLowerCase()).map(asType("REGISTER")),
	literal = A.choice([
        A.char("$").chain(() => A.regex(/^[0-9a-f]+/i).map(x => parseInt(x, 16))),
        A.str("0b").chain(() => A.many1(A.anyOfString("01")).map(x => parseInt(x.join(""), 2))),
        A.digits.map(x => parseInt(x))
    ]).map(asType("LITERAL"));

const mov_lit_reg = A.coroutine(function*() {
	yield A.str("mov");
	yield optionalWhitespace;
    const arg1 = yield literal;
    yield optionalWhitespace;
    const arg2 = yield register;
    yield A.optionalWhitespace;
    return asType("INSTRUCTION")({
        instruction: "MOV_LIT_REG",
        args: [arg1, arg2]
    });
});

deepLog(mov_lit_reg.run("mov $23 acc"));
