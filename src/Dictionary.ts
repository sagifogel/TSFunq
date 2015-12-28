/// <reference path="ihashable.ts" />

module TSFunq {
    export class Dictionary<TKey extends IHashable, TValue>  {
        constructor(init: { key: TKey; value: TValue; }[] = []) {
            for (let i = 0; i < init.length; i++) {
                let item = init[i];

                this[item.key.getHashCode()] = item.value;
            }
        }

        public add(key: TKey, value: TValue): void {
            this[key.getHashCode()] = value;
        }

        public remove(key: TKey): void {
            delete this[key.getHashCode()];
        }

        public containsKey(key: TKey): boolean {
            return !!this[key.getHashCode()];
        }

        public tryGetValue(key: TKey, entry: { out: TValue }): boolean {
            var value = this[key.getHashCode()];

            if (value) {
                entry.out = value;
                return true;
            }

            return false;
        }
    }
}