//#region Setup

const instructions = require("./instructions"),
	MemoryMapper = require("./memory"),
	createScreenDevice = require("./screenDevice");

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
memory.map(createMemoryDevice(), 0, 0xffff);
memory.map(createScreenDevice(), 0x6000, 0x60ff);

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

		// Move value pointed to by register to register
		case instructions.MOV_REG_PTR_REG: {
			const ptr = reg(getRegister());
			reg(getRegister(), memory.read(ptr));
			return true;
		}

		// Move value at [literal + register] to register
		case instructions.MOV_LIT_OFF_REG: {
			const base = fetch(),
				offset = reg(getRegister());

			reg(getRegister(), memory.read(base + offset));
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

const prog = [];
var latestOffset = 0;

const writeCharacter = char => {
	prog.push(instructions.MOV_LIT_MEM);
	prog.push(char.charCodeAt(0));
	prog.push(0x6000 + latestOffset++);
};

const writeString = string => {
	string.split("").map(writeCharacter);
};

const setColor = (foreground, background) => {
	const color = {
		black: {fg: 30, bg: 40},
		red: {fg: 31, bg: 41},
		green: {fg: 32, bg: 42},
		yellow: {fg: 33, bg: 43},
		blue: {fg: 34, bg: 44},
		magenta: {fg: 35, bg: 45},
		cyan: {fg: 36, bg: 46},
		white: {fg: 37, bg: 47},
		bright_black: {fg: 90, bg: 100},
		bright_red: {fg: 91, bg: 101},
		bright_green: {fg: 92, bg: 102},
		bright_yellow: {fg: 93, bg: 103},
		bright_blue: {fg: 94, bg: 104},
		bright_magenta: {fg: 95, bg: 105},
		bright_cyan: {fg: 96, bg: 106},
		bright_white: {fg: 97, bg: 107}
	};

	const fgCode = color[foreground].fg - 30,
		bgCode = color[background].bg - 30;
	prog.push(instructions.MOV_LIT_MEM);
	prog.push(32768 | ((fgCode << 8) | bgCode));
	prog.push(0x6000 + latestOffset++);
};

setColor("red", "black");
for (let i = 0; i <= 0xff; i++) writeCharacter(i % 5 ? "*" : " ");

for (const i in prog) memory.write(i, prog[i]);
while (execute(fetch())) continue;
process.stdout.write(`\x1b[0;0;0m`);
