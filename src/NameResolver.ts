module TSFunq {
    export class NameResolver {
        static nameRegex = /function ([^\(]+)/;

        static resolve(ctor: Function): string {
            return (<any>ctor).name || ctor.toString().match(NameResolver.nameRegex)[1];
        }
    }
}