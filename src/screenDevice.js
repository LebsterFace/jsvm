function moveTo(x, y) {
	process.stdout.write(`\x1b[${y};${x * 2 + 1}H`);
}

function createScreenDevice() {
	return {
		read: () => 0,
		write: (addr, value) => {
			moveTo(addr % 16, Math.floor(addr / 16));
			process.stdout.write(String.fromCharCode(value));
		}
	};
}

module.exports = createScreenDevice;
