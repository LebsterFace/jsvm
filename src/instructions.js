const generated = [
	"MOV_LIT_REG",
	"MOV_REG_REG",
	"MOV_REG_MEM",
	"MOV_MEM_REG",
	"MOV_LIT_MEM",
	"MOV_REG_PTR_REG",
	"MOV_LIT_OFF_REG",

	"ADD_REG_REG",
	"ADD_LIT_REG",
	"SUB_REG_REG",
	"SUB_LIT_REG",
	"SUB_REG_LIT",
	"INC_REG",
	"DEC_REG",
	"MUL_LIT_REG",
	"MUL_REG_REG",

	"LSF_REG_LIT",
	"LSF_REG_REG",
	"RSF_REG_LIT",
	"RSF_REG_REG",

	"AND_REG_LIT",
	"AND_REG_REG",
	"OR_REG_LIT",
	"OR_REG_REG",
	"XOR_REG_LIT",
	"XOR_REG_REG",
	"NOT",

	"JNE_LIT",
	"JNE_REG",
	"JEQ_LIT",
	"JEQ_REG",
	"JLT_LIT",
	"JLT_REG",
	"JGT_LIT",
	"JGT_REG",
	"JMP_LIT",
	"JMP_REG",

	"JSR_LIT",
	"JSR_REG",
	"RET",

	"PUSH_LIT",
	"PUSH_REG",
	"PULL_REG",
	"PULL_MEM",
	"POP"
].reduce((map, val, index) => {
	map[val] = index + 1;
	return map;
}, {});

module.exports = {
	...generated,
	HALT: 0xffff
};