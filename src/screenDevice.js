function moveTo(x, y) {
	process.stdout.write(`\x1b[${y + 1};${x + 1}H`);
}

function createScreenDevice() {
	const videoMemory = new Uint8Array(256);

	return {
		read: addr => videoMemory[addr],
		write: (addr, value) => {
			debugger;
			const char = value & 0x00ff;
			videoMemory[addr] = char;
			moveTo(addr % 16, Math.floor(addr / 16));
			process.stdout.write(String.fromCharCode(char));
		}
	};
}

module.exports = createScreenDevice;
