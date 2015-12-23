/// <reference path="iequatable.ts" />

module TSFunq {
    export class EquatbaleString implements IEquatable<EquatbaleString> {
        constructor(public value: string) {
        }

        equals(other: EquatbaleString): boolean {
            return this.getHashCode() === other.getHashCode();
        }

        getHashCode(): number {
            var val = this.value,
                hash = 0,
                i = 0,
                len = val.length,
                chr;

            while (i < len) {
                hash = ((hash << 5) - hash + val.charCodeAt(i++)) << 0;
            }

            return hash;
        }
    }
}