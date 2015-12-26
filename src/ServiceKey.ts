/// <reference path="iequatable.ts" />
/// <reference path="nameresolver.ts" />
/// <reference path="equatbalestring.ts" />

module TSFunq {
    export class ServiceKey implements IEquatable<ServiceKey> {
        private hash: number;

        constructor(private ctor: Function, private serviceName?: string) {
            var name = NameResolver.resolve(ctor);
            var equatbaleString = new EquatbaleString(name);

            this.hash = equatbaleString.getHashCode();

            if (serviceName) {
                let equatbaleServiceName = new EquatbaleString(serviceName);
                this.hash ^= equatbaleServiceName.getHashCode();
            }
        }

        equals(obj: ServiceKey): boolean {
            if (obj && obj.getHashCode) {
                return obj.getHashCode() === this.getHashCode();
            }

            return false;
        }

        getHashCode(): number {
            return this.hash;
        }
    }
}
