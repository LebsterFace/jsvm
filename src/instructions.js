module.exports = {
	MOV_LIT_REG     : 0x01,
	MOV_REG_REG     : 0x02,
	MOV_REG_MEM     : 0x03,
	MOV_MEM_REG     : 0x04,
	MOV_LIT_MEM     : 0x05,
	MOV_REG_PTR_REG : 0x06,
	MOV_LIT_OFF_REG : 0x07,

	ADD_REG_REG     : 0x10,
	ADD_LIT_REG     : 0x11,
	SUB_REG_REG     : 0x12,
	SUB_LIT_REG     : 0x13,
	SUB_REG_LIT     : 0x14,
	INC_REG         : 0x15,
	DEC_REG         : 0x16,
	MUL_LIT_REG     : 0x17,
	MUL_REG_REG     : 0x18,

	JMP_NOT_EQ      : 0x20,

	PUSH_LIT        : 0x30,
	PUSH_REG        : 0x31,

	PULL_REG        : 0x42,
	PULL_ME         : 0x43,

	HALT            : 0xFFFF
};
