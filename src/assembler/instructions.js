const A = require("arcsecond"),
	{single_mem, lit_reg, reg_reg, reg_mem, mem_reg, lit_mem, reg_ptr_reg, lit_off_reg, single_lit, single_reg, no_args, reg_lit} = require("./argTypes");

const mov = A.choice([
	lit_reg("mov", "MOV_LIT_REG"),
	reg_reg("mov", "MOV_REG_REG"),
	mem_reg("mov", "MOV_MEM_REG"),
	lit_mem("mov", "MOV_LIT_MEM"),
	reg_ptr_reg("mov", "MOV_REG_PTR_REG"),
	lit_off_reg("mov", "MOV_LIT_OFF_REG")
]);

const add = A.choice([
	reg_reg("add", "ADD_REG_REG"),
	lit_reg("add", "ADD_LIT_REG")
]);

const sub = A.choice([
	reg_reg("sub", "SUB_REG_REG"),
	lit_reg("sub", "SUB_LIT_REG"),
	reg_lit("sub", "SUB_REG_LIT")
]);

const inc = single_reg("inc", "INC_REG");
const dec = single_reg("dec", "DEC_REG");

const mul = A.choice([
	lit_reg("mul", "MUL_LIT_REG"),
	reg_reg("mul", "MUL_REG_REG")
]);

const lsf = A.choice([
	reg_reg("lsf", "LSF_REG_REG"),
	lit_reg("lsf", "LSF_LIT_REG")
]);

const rsf = A.choice([
	reg_reg("rsf", "RSF_REG_REG"),
	lit_reg("rsf", "RSF_LIT_REG")
]);

const and = A.choice([
	reg_reg("and", "AND_REG_REG"),
	lit_reg("and", "AND_LIT_REG")
]);

const or = A.choice([
	reg_reg("or", "XOR_REG_REG"),
	lit_reg("or", "XOR_LIT_REG")
]);

const xor = A.choice([
	reg_reg("xor", "XOR_REG_REG"),
	lit_reg("xor", "XOR_LIT_REG")
]);

const not = single_reg("not", "NOT");

const jne = A.choice([
	single_lit("jne", "JNE_LIT"),
	single_reg("jne", "JNE_REG")
]);

const jeq = A.choice([
	single_lit("jeq", "JEQ_LIT"),
	single_reg("jeq", "JEQ_REG")
]);

const jlt = A.choice([
	single_lit("jlt", "JLT_LIT"),
	single_reg("jlt", "JLT_REG")
]);

const jgt = A.choice([
	single_lit("jgt", "JGT_LIT"),
	single_reg("jgt", "JGT_REG")
]);

const jsr = A.choice([
	single_lit("jsr", "jsr_LIT"),
	single_reg("jsr", "jsr_REG")
]);

const ret = no_args("ret", "RET");

const push = A.choice([
	single_lit("push", "PUSH_LIT"),
	single_reg("push", "PUSH_REG")
]);

const pull = A.choice([
	single_reg("pull", "PUSH_REG"),
	single_mem("pull", "PUSH_MEM")
]);

const pop = no_args("pop", "POP");

module.exports = A.choice([
	mov,
	add,
	sub,
	inc,
	dec,
	mul,
	lsf,
	rsf,
	and,
	or,
	xor,
	not,
	jne,
	jlt,
	jeq,
	jgt,
	jsr,
	ret,
	push,
	pull,
	pop
]);
