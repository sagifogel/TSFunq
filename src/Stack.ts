module TSFunq {
    export class Stack<T> {
        arr: Array<T>;

        constructor() {
            this.arr = new Array<T>();
        }

        get length() {
            return this.arr.length;
        }

        clear(): void {
            this.arr.length = 0;
        }

        contains(item: T): boolean {
            return this.arr.indexOf(item) > -1;
        }

        peek(): T {
            return this.arr[0];
        }

        pop(): T {
            return this.arr.shift();
        }

        push(item: T): void {
            this.arr.push(item);
        }
    }
}