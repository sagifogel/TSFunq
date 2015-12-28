import {Container} from "./Container";

class ServiceEntry implements IRegistration {
    public owner: Owner;
    public reuse: ReuseScope;
    public container: Container;

    ownedBy(owner: Owner): void {
        this.owner = owner;
    }

    reusedWithin(scope: ReuseScope): IOwned {
        this.reuse = scope;
        return this;
    }
}

export {ServiceEntry}

