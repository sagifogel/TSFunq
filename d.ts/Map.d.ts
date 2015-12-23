interface MapConstructor {
    new (): Map;
}

interface Map {
    clear(): void;
    size(): number;
    keys(): Iterator;
    entries(): Iterator;
    get(key: any): any;
    values(): Iterator;
    delete(key: any): void;
    has(key: any): boolean;
    set(key: any, value: any): Map;
    forEach(callback: (element: any, key: any, map: Map) => void, thisArg: any): void;
}

interface Iterator {
    next(): IteratorItem;
}

interface IteratorItem {
    value: any,
    done: boolean;
}

declare var Map: MapConstructor;