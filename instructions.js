const QI = `
mov lit reg
mov reg reg
mov reg mem
mov mem reg
mov lit mem
add reg reg
add lit reg
jmp not eq
push lit
push reg
pull reg
pull me
`.trim().split("\n").map((name, index) => [name.replace(/ /g, "_").toUpperCase(), index + 1]).reduce((map, [name, index]) => {
	map[name] = index;
	return map;
}, {});

module.exports = {
    ...QI,
	PEEK_MEM: 0xfe,
	DEBUG_REG: 0xff,
	HALT: 0xffff
};
