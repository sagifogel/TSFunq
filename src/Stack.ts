class Stack<T> {
    arr: Array<T>;

    constructor() {
        this.arr = new Array<T>();
    }

    public get length() {
        return this.arr.length;
    }

    public clear(): void {
        this.arr.length = 0;
    }

    public contains(item: T): boolean {
        return this.arr.indexOf(item) > -1;
    }

    public peek(): T {
        return this.arr[0];
    }

    public pop(): T {
        return this.arr.shift();
    }

    public push(item: T): void {
        this.arr.push(item);
    }
}

export {Stack}