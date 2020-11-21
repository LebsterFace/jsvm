const instructions = require("./instructions"),
	registers = ["acc", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"];
	
module.exports = function(prog) {
	const code = prog.trim().split("\n").filter(x => x);
	return code.flatMap(line => {
			const split = line.split(" "),
				instructionName = [split[0]];
	
			for (let i = 1; i < split.length; i++) {
				split[i] = split[i].split("-");
				instructionName.push(split[i][0]);
	
				switch (split[i][0]) {
					case "LIT":
						split[i] = parseInt(split[i][1], 16);
						break;
					case "REG":
						split[i] = registers.indexOf(split[i][1].toLowerCase());
						break;
					case "MEM":
						split[i] = parseInt(split[i][1], 16);
						break;
					default:
						split[i] = null;
					}
			}
	
			split[0] = instructions[instructionName.join("_").toUpperCase()];
			return split.filter(x => x);
		})
		.concat(0xffff);
};
