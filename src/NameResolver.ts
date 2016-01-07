class NameResolver {
    static nameRegex = /function ([^\(]+)/;

    public static resolve(ctor: Function | string): string {
        if (typeof ctor === "string") {
            return ctor;
        }

        return (<any>ctor).name || NameResolver.resolveByCode(<Function>ctor);
    }

    private static resolveByCode(ctor: Function): string {
        let match = ctor.toString().match(NameResolver.nameRegex);

        return (match && match.length > 0 && match[1]) || NameResolver.resolveByPrototype(ctor);
    }

    private static resolveByPrototype(ctor: Function): string {
        let buffer = new Array<string>();
        let prototype = ctor.prototype;

        for (let item in prototype) {
            buffer.push(item);
        }

        return buffer.join("");
    }
}

export { NameResolver };