module TSFunq {
    function resolveByCode(ctor: Function): string {
        var match = ctor.toString().match(NameResolver.nameRegex);

        return (match && match.length > 0 && match[1]) || resolveByPrototype(ctor);
    }

    function resolveByPrototype(ctor: Function): string {
        var buffer = new Array<string>();
        var prototype = ctor.prototype;

        for (var item in prototype) {
            if (typeof prototype[item] === "function") {
                buffer.push(item);
            }
        }

        return buffer.join("");
    }

    export class NameResolver {
        static nameRegex = /function ([^\(]+)/;

        static resolve(ctor: Function): string {
            return (<any>ctor).name || resolveByCode(ctor);
        }
    }
}