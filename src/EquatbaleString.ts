﻿class EquatbaleString implements IHashable {
    constructor(private value: string) {
    }

    public getHashCode(): number {
        let val = this.value,
            hash = 0,
            i = 0,
            len = val.length,
            chr: number;

        while (i < len) {
            hash = ((hash << 5) - hash + val.charCodeAt(i++)) << 0;
        }

        return hash;
    }
}

export { EquatbaleString };