module.exports = {
	MOV_LIT_REG     : 0x01,
	MOV_REG_REG     : 0x02,
	MOV_REG_MEM     : 0x03,
	MOV_MEM_REG     : 0x04,
	MOV_LIT_MEM     : 0x05,
	MOV_REG_PTR_REG : 0x06,
	MOV_LIT_OFF_REG : 0x07,
	ADD_REG_REG     : 0x16,
	ADD_LIT_REG     : 0x17,
	JMP_NOT_EQ      : 0x28,
	PUSH_LIT        : 0x39,
	PUSH_REG        : 0x3A,
	PULL_REG        : 0x4B,
	PULL_ME         : 0x4C,
	HALT            : 0xFFFF
};
