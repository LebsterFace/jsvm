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

	"JMP_NOT_EQ",

	"CALL_LIT",
	"CALL_REG",
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