import { NameResolver } from "./NameResolver";
import { EquatbaleString } from "./EquatbaleString";

class ServiceKey implements IHashable {
    private hash: number;

    constructor(private ctor: Function | string, private serviceName: string = "0") {
        let name = NameResolver.resolve(ctor);
        let equatbaleString = new EquatbaleString(name);
        let equatbaleServiceName = new EquatbaleString(serviceName);

        this.hash = equatbaleString.getHashCode() ^ equatbaleServiceName.getHashCode();
    }

    public getHashCode(): number {
        return this.hash;
    }
}

export { ServiceKey };
