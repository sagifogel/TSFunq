interface WeakMapConstructor {
    new (): WeakMap;
}

interface WeakMap {
    get(key: any): any;
    delete(key: any): void;
    has(key: any): boolean;
    set(key: any, value: any): void;
}

declare var WeakMap: WeakMapConstructor;
