/// <reference path="iequatable.ts" />
/// <reference path="nameresolver.ts" />
/// <reference path="equatbalestring.ts" />

module TSFunq {
    export class ServiceKey implements IEquatable<ServiceKey> {
        hash: number;

        constructor(public ctor: Function, public serviceName?: string) {
            var name = NameResolver.resolve(ctor);
            var equatbaleString = new EquatbaleString(name);

            this.hash = equatbaleString.getHashCode();

            if (serviceName) {
                let equatbaleServiceName = new EquatbaleString(serviceName);
                this.hash ^= equatbaleServiceName.getHashCode();
            }
        }

        equals(obj: ServiceKey): boolean {
            return obj.getHashCode() === this.getHashCode();
        }

        getHashCode(): number {
            return this.hash;
        }
    }
}
