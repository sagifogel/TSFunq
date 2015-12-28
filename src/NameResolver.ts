class NameResolver {
    static nameRegex = /function ([^\(]+)/;

    public static resolve(ctor: Function): string {
        return (<any>ctor).name || NameResolver.resolveByCode(ctor);
    }

    private static resolveByCode(ctor: Function): string {
        var match = ctor.toString().match(NameResolver.nameRegex);

        return (match && match.length > 0 && match[1]) || NameResolver.resolveByPrototype(ctor);
    }

    private static resolveByPrototype(ctor: Function): string {
        var buffer = new Array<string>();
        var prototype = ctor.prototype;

        for (var item in prototype) {
            buffer.push(item);
        }

        return buffer.join("");
    }
}

export {NameResolver}