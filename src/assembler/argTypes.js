const A = require("arcsecond"),
	{asType, whitespace, literal, register, variable, address, charLit} = require("./common"),
	expression = require("./expressions");

const lit = A.choice([literal, charLit, variable, expression]),
	addr = A.choice([address, A.char("&").chain(() => expression)]);

const lit_reg = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield lit;
		yield whitespace;
		const arg2 = yield register;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1, arg2]
		});
	});

const reg_reg = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield register;
		yield whitespace;
		const arg2 = yield register;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1, arg2]
		});
	});

const reg_mem = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield register;
		yield whitespace;
		const arg2 = yield addr;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1, arg2]
		});
	});

const mem_reg = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield addr;
		yield whitespace;
		const arg2 = yield register;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1, arg2]
		});
	});

const lit_mem = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield lit;
		yield whitespace;
		const arg2 = yield addr;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1, arg2]
		});
	});

const single_mem = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield addr;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1]
		});
	});

const reg_ptr_reg = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield A.char("&").chain(() => register);
		yield whitespace;
		const arg2 = yield register;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1, arg2]
		});
	});

const lit_off_reg = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield lit;
		yield whitespace;
		const arg2 = yield A.char("&").chain(() => register);
		yield whitespace;
		const arg3 = yield register;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1, arg2, arg3]
		});
	});

const reg_lit = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield register;
		yield whitespace;
		const arg2 = yield lit;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1, arg2]
		});
	});

const no_args = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: []
		});
	});

const single_reg = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield register;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1]
		});
	});

const single_lit = (name, instruction) =>
	A.coroutine(function*() {
		yield A.str(name);
		yield whitespace;
		const arg1 = yield lit;
		yield A.optionalWhitespace;
		return asType("INSTRUCTION")({
			instruction,
			args: [arg1]
		});
	});

module.exports = {single_mem, lit_reg, reg_reg, reg_mem, mem_reg, lit_mem, reg_ptr_reg, lit_off_reg, single_lit, single_reg, no_args, reg_lit};
