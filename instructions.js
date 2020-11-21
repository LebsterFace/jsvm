module.exports = {
    MOV_LIT_REG: 0x01,
    MOV_REG_REG: 0x02,
    MOV_REG_MEM: 0x03,
    MOV_MEM_REG: 0x04,
    MOV_LIT_MEM: 0x05,

    ADD_REG_REG: 0x06,
    ADD_LIT_REG: 0x07,

    JMP_NOT_EQ: 0x08,
    
    PEEK_MEM: 0xFE,
    DEBUG_REG: 0xFF,
    HALT: 0xFFFF
};
