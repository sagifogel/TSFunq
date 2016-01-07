class Dictionary<TKey extends IHashable, TValue>  {
    public add(key: TKey, value: TValue): void {
        this[key.getHashCode()] = value;
    }

    public tryGetValue(key: TKey, entry: { out: TValue }): boolean {
        let value = this[key.getHashCode()];

        if (value) {
            entry.out = value;
            return true;
        }

        return false;
    }
}

export { Dictionary };