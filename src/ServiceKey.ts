import { NameResolver } from "./NameResolver";
import { EquatbaleString } from "./EquatbaleString";

class ServiceKey implements IHashable {
    private hash: number;

    constructor(private ctor: Function | string, private serviceName?: string) {
        var name = NameResolver.resolve(ctor);
        var equatbaleString = new EquatbaleString(name);

        this.hash = equatbaleString.getHashCode();

        if (serviceName) {
            let equatbaleServiceName = new EquatbaleString(serviceName);
            this.hash ^= equatbaleServiceName.getHashCode();
        }
    }

    public getHashCode(): number {
        return this.hash;
    }
}

export { ServiceKey };
