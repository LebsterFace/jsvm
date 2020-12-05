const A = require("arcsecond"), {validIdentifier, asType} = require("./common");

module.exports = A.sequenceOf([
    validIdentifier,
    A.char(":"),
    A.optionalWhitespace
]).map(([name]) => asType("LABEL")(name));