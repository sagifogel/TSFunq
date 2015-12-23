module TSFunq {
    export interface IRegistration extends IReusedOwned {
    }

    export interface IGenericRegistration<TService> extends IRegistration, IInitializable<TService> {
    }

    export interface IInitializable<TService> {
        initializedBy(initializer: Action<Container, TService>): IReusedOwned;
    }

    export interface IReusedOwned extends IReused, IOwned {
    }

    export interface IOwned {
        ownedBy(owner: Owner): void;
    }

    export interface IReused {
        reusedWithin(scope: ReuseScope): IOwned;
    }
}
