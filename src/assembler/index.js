const A = require("arcsecond"), {inspect} = require("util"), instruction = require("./instructions.js");
const deepLog = obj => console.log(inspect(obj, {depth: Infinity, colors: true}));

deepLog(A.many(instruction).run(`

mov 3 r1
mov 4 r2
add r1 r2
add 48 acc
mov acc &6000

`.trim()));