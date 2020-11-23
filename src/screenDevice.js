function moveTo(x, y) {
	process.stdout.write(`\x1b[${y};${x * 2 + 1}H`);
}

function setColor(bg, fg) {
	process.stdout.write(`\x1b[${fg};${bg}m`);
}

function createScreenDevice() {
	return {
		read: () => 0,
		write: (addr, value) => {
			if (value >> 15) {
				const background = ((value & 32512) >> 8) + 30, // Top half
					foreground = (value & 255) + 30; // Bottom half

				setColor(background, foreground);
			} else {
				moveTo(addr % 16, Math.floor(addr / 16));
				process.stdout.write(String.fromCharCode(value));
			}
		}
	};
}

module.exports = createScreenDevice;
