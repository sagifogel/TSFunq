/// <reference path="syntax.ts" />
/// <reference path="resolutionexception.ts" />
/// <reference path="reusescope.ts" />
/// <reference path="container.ts" />

module TSFunq {
    export class ServiceEntry implements IRegistration {
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
}
