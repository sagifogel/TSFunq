declare enum ReuseScope {
    container,
    hierarchy,
    none,
    default
}

declare enum Owner {
    container,
    external,
    default
}

interface IHashable {
    getHashCode(): number;
}

interface IEquatable<T> extends IHashable {
    equals(other: T): boolean;
}

interface IDisposable {
    dispose(): void;
}

interface IRegistration extends IReusedOwned {
}

interface IGenericRegistration<TService> extends IRegistration, IInitializable<TService> {
}

interface IInitializable<TService> {
    initializedBy(initializer: Action<IRegistrationResolver, TService>): IReusedOwned;
}

interface IReusedOwned extends IReused, IOwned {
}

interface IOwned {
    ownedBy(owner: Owner): void;
}

interface IReused {
    reusedWithin(scope: ReuseScope): IOwned;
}

interface IRegistry {
    registerInstance<TService>(instance: TService): void;
    registerNamedInstance<TService>(name: string, instance: TService): void;
    register<TService>(ctor: { new (): TService; }, factory: Func<IRegistrationResolver, TService>): IGenericRegistration<TService>;
    registerNamed<TService>(ctor: { new (): TService; }, name: string, factory: Func<IRegistrationResolver, TService>): IGenericRegistration<TService>;
}

interface IRegistrationResolver {
    resolve<TService>(ctor: new () => TService): TService;
    tryResolve<TService>(ctor: new () => TService): TService;
    lazyResolve<TService>(ctor: new () => TService): () => TService;
    resolveNamed<TService>(ctor: new () => TService, name: string): TService;
    tryResolveNamed<TService>(ctor: new () => TService, name: string): TService;
    lazyResolveNamed<TService>(ctor: new () => TService, name: string): () => TService;
}

declare type Func<T1, TResult> = (arg1: T1) => TResult;
declare type Action<T1, T2> = (arg1: T1, arg2: T2) => void;