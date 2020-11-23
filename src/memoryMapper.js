class MemoryMapper {
    constructor() {
        this.regions = [];
    }

    map(device, start, end) {
        const region = { device, start, end };
        this.regions.unshift(region);
        return () => { this.regions = this.regions.filter(x => x !== region); };
    }

    findRegion(address) {
        const region = this.regions.find(r => address >= r.start && address <= r.end);
        if (!region) throw `Address $${address.toString(16).padStart(4, "0")} is not mapped!`;
        return region;
    }

    read(address) {
        const region = this.findRegion(address);
        return region.device.read(address - region.start);
    }

    write(address, value) {
        const region = this.findRegion(address);
        return region.device.write(address - region.start, value);
    }
}

module.exports = MemoryMapper;