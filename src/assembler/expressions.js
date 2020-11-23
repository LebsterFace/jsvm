const A = require("arcsecond"),
	{asType, optionalWhitespace, literal, variable} = require("./common");

const operator = A.anyOfString("+-*/").map(asType("OPERATOR"));

const expression = A.coroutine(function*() {
	const expr = [],
		states = {
			EXPECT_ELEMENT: 0,
			EXPECT_OPERATOR: 1
		};

	let state = states.EXPECT_ELEMENT;

	while (true) {
		if (state === states.EXPECT_ELEMENT) {
			const result = yield A.choice([A.between(A.char("("))(A.char(")"))(expression), literal, variable]);
			expr.push(result);
			state = states.EXPECT_OPERATOR;
			yield optionalWhitespace;
		} else if (state === states.EXPECT_OPERATOR) {
			const result = yield A.possibly(operator);
			yield optionalWhitespace;
			if (result) {
				expr.push(result);
				state = states.EXPECT_ELEMENT;
			} else break;
		}
	}

	return typifyBracketedExpression(expr);
}).map(fixOrder);

function typifyBracketedExpression(expr) {
	return asType("EXPRESSION")(expr.map(el => (Array.isArray(el) ? typifyBracketedExpression(el) : el)));
}

function fixOrder(expr) {
	if (expr.type !== "EXPRESSION") return expr;
	if (expr.value.length === 1) return expr.value[0];
	const priorities = {"/": 1, "*": 1, "+": 0, "-": 0};
	let canditateExpression = {priority: -Infinity};

	for (let i = 1; i < expr.value.length; i += 2) {
		const level = priorities[expr.value[i].value];
		if (level > canditateExpression.priority) canditateExpression = {priority: level, a: i - 1, op: expr.value[i], b: i + 1};
	}

	const newExpression = asType("EXPRESSION")([
		...expr.value.slice(0, canditateExpression.a),
		asType("BINARY_OPERATION")({
			a: fixOrder(expr.value[canditateExpression.a]),
			op: canditateExpression.op,
			b: fixOrder(expr.value[canditateExpression.b])
		}),
		...expr.value.slice(canditateExpression.b + 1)
	]);

	return fixOrder(newExpression);
}

module.exports = A.between(A.char("["))(A.char("]"))(expression);
