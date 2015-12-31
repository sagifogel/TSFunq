import { Owner } from "./Owner";
import {Container} from "./Container";
import { ReuseScope } from "./ReuseScope";


class ServiceEntry implements IRegistration {
    public owner: Owner;
    public reuse: ReuseScope;
    public container: Container;

    public ownedBy(owner: Owner): void {
        this.owner = owner;
    }

    public reusedWithin(scope: ReuseScope): IOwned {
        this.reuse = scope;
        return this;
    }
}

export {ServiceEntry}

