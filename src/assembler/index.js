const A = require("arcsecond"), {inspect} = require("util"), instruction = require("./instructions.js");
const deepLog = obj => console.log(inspect(obj, {depth: Infinity, colors: true}));

deepLog(instruction.run("mov $10 acc"));