module.exports = {
	MOV_LIT_REG: {
		opcode: 0x01,
		size: 2
	},
	MOV_REG_REG: {
		opcode: 0x02,
		size: 2
	},
	MOV_REG_MEM: {
		opcode: 0x03,
		size: 2
	},
	MOV_MEM_REG: {
		opcode: 0x04,
		size: 2
	},
	MOV_LIT_MEM: {
		opcode: 0x05,
		size: 2
	},
	MOV_REG_PTR_REG: {
		opcode: 0x06,
		size: 2
	},
	MOV_LIT_OFF_REG: {
		opcode: 0x07,
		size: 2
	},
	ADD_REG_REG: {
		opcode: 0x08,
		size: 2
	},
	ADD_LIT_REG: {
		opcode: 0x09,
		size: 2
	},
	SUB_REG_REG: {
		opcode: 0x0a,
		size: 2
	},
	SUB_LIT_REG: {
		opcode: 0x0b,
		size: 2
	},
	SUB_REG_LIT: {
		opcode: 0x0c,
		size: 2
	},
	INC_REG: {
		opcode: 0x0d,
		size: 1
	},
	DEC_REG: {
		opcode: 0x0e,
		size: 1
	},
	MUL_LIT_REG: {
		opcode: 0x0f,
		size: 2
	},
	MUL_REG_REG: {
		opcode: 0x10,
		size: 2
	},
	LSF_REG_LIT: {
		opcode: 0x11,
		size: 2
	},
	LSF_REG_REG: {
		opcode: 0x12,
		size: 2
	},
	RSF_REG_LIT: {
		opcode: 0x13,
		size: 2
	},
	RSF_REG_REG: {
		opcode: 0x14,
		size: 2
	},
	AND_REG_LIT: {
		opcode: 0x15,
		size: 2
	},
	AND_REG_REG: {
		opcode: 0x16,
		size: 2
	},
	OR_REG_LIT: {
		opcode: 0x17,
		size: 2
	},
	OR_REG_REG: {
		opcode: 0x18,
		size: 2
	},
	XOR_REG_LIT: {
		opcode: 0x19,
		size: 2
	},
	XOR_REG_REG: {
		opcode: 0x1a,
		size: 2
	},
	NOT: {
		opcode: 0x1b,
		size: 0
	},
	JNE_LIT: {
		opcode: 0x1c,
		size: 1
	},
	JNE_REG: {
		opcode: 0x1d,
		size: 1
	},
	JEQ_LIT: {
		opcode: 0x1e,
		size: 1
	},
	JEQ_REG: {
		opcode: 0x1f,
		size: 1
	},
	JLT_LIT: {
		opcode: 0x20,
		size: 1
	},
	JLT_REG: {
		opcode: 0x21,
		size: 1
	},
	JGT_LIT: {
		opcode: 0x22,
		size: 1
	},
	JGT_REG: {
		opcode: 0x23,
		size: 1
	},
	JMP_LIT: {
		opcode: 0x24,
		size: 1
	},
	JMP_REG: {
		opcode: 0x25,
		size: 1
	},
	JSR_LIT: {
		opcode: 0x26,
		size: 1
	},
	JSR_REG: {
		opcode: 0x27,
		size: 1
	},
	RET: {
		opcode: 0x28,
		size: 0
	},
	PUSH_LIT: {
		opcode: 0x29,
		size: 1
	},
	PUSH_REG: {
		opcode: 0x2a,
		size: 1
	},
	PULL_REG: {
		opcode: 0x2b,
		size: 1
	},
	PULL_MEM: {
		opcode: 0x2c,
		size: 1
	},
	POP: {
		opcode: 0x2d,
		size: 0
	},
	HALT: {
		opcode: 0xffff,
		size: 0
	}
};
