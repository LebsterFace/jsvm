function moveTo(x, y) {
	process.stdout.write(`\x1b[${y};${x * 2 + 1}H`);
}

function setColor(bg, fg) {
	process.stdout.write(`\x1b[${fg};${bg}m`);
}

function createScreenDevice() {
	var previousCommand = null;

	return {
		read: () => 0,
		write: (addr, value) => {
			const isCommand = value >> 15;

			if (isCommand) {
				const background = ((value & 0b0111111100000000) >> 8) + 30,
					  foreground = (value & 0b0000000011111111) + 30;

				setColor(background, foreground);
			} else {
				moveTo(addr % 16, Math.floor(addr / 16));
				process.stdout.write(String.fromCharCode(value));
			}
		}
	};
}

module.exports = createScreenDevice;
