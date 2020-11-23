//#region Setup

const instructions = require("./instructions");
const MemoryMapper = require("./memory");

const registerNames = ["ip", "acc", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "sp"],
	registerMap = registerNames.reduce((map, cv, index) => {
		map[cv] = index;
		return map;
	}, {}),
	registers = new Uint16Array(registerNames.length);


function createMemoryDevice() {
	const memory = new Uint16Array(65536);

	function read(addr) {
		return memory[addr];
	}

	function write(addr, value) {
		memory[addr] = value;
	}

	return {read, write};
}

const memory = new MemoryMapper();
memory.map(createMemoryDevice(), 0, 0xFFFF);

//#endregion
//#region Helper

function getRegister() {
	return registerNames[fetch() % (registerNames.length - 1) + 1];
}

function fetch() {
	return memory.read(increg("ip"));
}

function reg(name, val = null) {
	const result = registers[registerMap[name]];
	if (val !== null) registers[registerMap[name]] = val;
	return result;
}

function increg(name, amount = 1) {
	const result = registers[registerMap[name]];
	registers[registerMap[name]] += amount;
	return result;
}

//#endregion
//#region Execute

function execute(instruction) {
	switch (instruction) {

		// Cease execution
		case instructions.HALT:
			return false;

		// Move literal to register
		case instructions.MOV_LIT_REG: {
			const value = fetch(),
				regName = getRegister();
			reg(regName, value);
			return true;
		}

		// Move register to register
		case instructions.MOV_REG_REG: {
			const value = reg(getRegister());
			reg(getRegister(), value);
			return true;
		}

		// Move register to memory
		case instructions.MOV_REG_MEM: {
			const value = reg(getRegister());
			memory.write(fetch(), value);
			return true;
		}

		// Move memory to register
		case instructions.MOV_MEM_REG: {
			const value = memory.read(fetch());
			reg(getRegister(), value);
			return true;
		}

		// Move literal to memory
		case instructions.MOV_LIT_MEM: {
			const value = fetch();
			memory.write(fetch(), value);
			return true;
		}

		// Add register to register
		case instructions.ADD_REG_REG: {
			reg("acc", reg(getRegister()) + reg(getRegister()));
			return true;
		}

		// Add literal to register
		case instructions.ADD_LIT_REG: {
			const value = fetch();
			increg(getRegister(), value);
			return true;
		}

		// Jump if not equal
		case instructions.JMP_NOT_EQ: {
			const value = fetch(),
				addr = fetch();

			if (value !== reg("acc")) {
				reg("ip", addr);
			}

			return true;
		}

		// Push literal to stack
		case instructions.PUSH_LIT: {
			memory.write(increg("sp"), fetch());
			return true;
		}

		// Push register to stack
		case instructions.PUSH_REG: {
			memory.write(increg("sp"), reg(getRegister()));
			return true;
		}

		// Pull from stack to memory
		case instructions.PULL_MEM: {
			memory.write(fetch(), memory.read(increg("sp", -1) - 1));
			return true;
		}

		// Pull from stack to register
		case instructions.PULL_REG: {
			const register = getRegister();
			reg(register, memory.read(increg("sp", -1) - 1));
			return true;
		}
	}
}

reg("sp", 0xfeff);

//#endregion

const prog = [
	instructions.MOV_LIT_REG, 0x69, 0x00,
	instructions.ADD_LIT_REG, 0x07, 0x00
];

for (const i in prog) memory.write(i, prog[i]);
while (execute(fetch())) continue;
registerNames.forEach(n => {
	console.log(`${n} : $${reg(n).toString(16)}`);
});