const A = require("arcsecond"), {validIdentifier, asType} = require("./common");

module.exports = A.takeLeft(validIdentifier)(A.char(":")).map(asType("LABEL"));