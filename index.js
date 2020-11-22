//#region Setup
const instructions = require("./instructions"),
	readline = require("readline"),
	memory = new Uint16Array(65536),
	registerNames = ["ip", "acc", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "sp"],
	registerMap = registerNames.reduce((map, cv, index) => {
		map[cv] = index;
		return map;
	}, {}),
	registers = new Uint16Array(registerNames.length),
	stackLength = 128;

reg("sp", 0xffff - stackLength);

//#endregion
//#region Debugging

function memoryPeek(from = 0, prepend = false) {
	console.log(`${prepend ? "\n> " : ""}${formatValue(from)}: [${formatNumber(memory[from])}] ${Array.from(memory.slice(from + 1, from + 4)).map(formatNumber).join(" ")}`);
}

function memoryPeekAround(around, prepend = false) {
	const before = Array.from(memory.slice(around - 2, around)).map(formatNumber),
		middle = "[" + formatNumber(memory[around]) + "]",
		end = Array.from(memory.slice(around + 1, around + 3)).map(formatNumber);

	console.log(`${prepend ? "\n> " : ""}${formatValue(around)}! ${before.concat(middle).concat(end).join(" ")}`);
}

function formatValue(n) {
	return n.toString(16).padStart(4, "0").toUpperCase();
}

function formatNumber(n) {
	return "0x" + n.toString(16).toUpperCase().padStart(2, "0");
}

const INSTRUCTION_NAMES = {};
for (const name in instructions) INSTRUCTION_NAMES[instructions[name]] = name;

function getInstructionName(value) {
	return INSTRUCTION_NAMES[value];
}

function debug() {
	console.log(`\nNext Instruction : ${getInstructionName(memory[reg("ip")])}`);
	memoryPeek(reg("ip"));
	memoryPeekAround(reg("sp"));

	registerNames.forEach((name, index) => {
		console.log(`${name.padEnd(4, " ")}: ${formatValue(registers[index])}`);
	});

	console.log();
}

//#endregion
//#region Helper

function getRegister() {
	return registerNames[fetch() % (registerNames.length - 1) + 1];
}

function fetch() {
	return memory[increg("ip")];
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
			memory[fetch()] = value;
			return true;
		}

		// Move memory to register
		case instructions.MOV_MEM_REG: {
			const value = memory[fetch()];
			reg(getRegister(), value);
			return true;
		}

		// Move literal to memory
		case instructions.MOV_LIT_MEM: {
			const value = fetch();
			memory[fetch()] = value;
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
			memory[increg("sp")] = fetch();
			return true;
		}

		// Push register to stack
		case instructions.PUSH_REG: {
			memory[increg("sp")] = reg(getRegister());
			return true;
		}

		// Pull from stack to memory
		case instructions.PULL_MEM: {
			memory[fetch()] = memory[increg("sp", -1) - 1];
			return true;
		}

		// Pull from stack to register
		case instructions.PULL_REG: {
			const register = getRegister();
			reg(register, memory[increg("sp", -1) - 1]);
			return true;
		}

		// DEBUG INSTRUCTIONS

		case instructions.DEBUG_REG: {
			const regName = getRegister();
			const value = reg(regName);
			console.log(`> ${regName.padStart(4, " ")} : ${formatNumber(value)}`);
			return true;
		}
		case instructions.PEEK_MEM: {
			memoryPeek(fetch(), true);
			return true;
		}
	}
}

function step() {
	return execute(fetch());
}

//#endregion

const prog = [0x01, 0x69, 0x00, 0x0a, 0x00, 0x0b, 0x01, 0xffff];

for (const i in prog) memory[i] += prog[i];

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var keepGoing = true;
rl.on("line", () => {
	if (!keepGoing) process.exit(0);
	debug();
	keepGoing = step();
});