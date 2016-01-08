﻿interface IHashable {
    getHashCode(): number;
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
    ownedBy(owner: number): void;
}

interface IReused {
    reusedWithin(scope: number): IOwned;
}

interface IRegistry {
    registerInstance<TService>(instance: TService): void;
    registerNamedInstance<TService>(name: string, instance: TService): void;
    register<TService>(ctor: Constructor<TService>, factory: Func<IRegistrationResolver, TService>): IGenericRegistration<TService>;
    registerNamed<TService>(ctor: Constructor<TService>, name: string, factory: Func<IRegistrationResolver, TService>): IGenericRegistration<TService>;
}

interface IContainer extends IRegistrationResolver, IRegistry, IDisposable {
}

interface IRegistrationResolver {
    resolve<TService>(ctor: Constructor<TService>): TService;
    tryResolve<TService>(ctor: Constructor<TService>): TService;
    lazyResolve<TService>(ctor: Constructor<TService>): () => TService;
    resolveNamed<TService>(ctor: Constructor<TService>, name: string): TService;
    tryResolveNamed<TService>(ctor: Constructor<TService>, name: string): TService;
    lazyResolveNamed<TService>(ctor: Constructor<TService>, name: string): () => TService;
}

declare type Func<T1, TResult> = (arg1: T1) => TResult;
declare type Action<T1, T2> = (arg1: T1, arg2: T2) => void;
declare type Constructor<TService> = (new (...args: any[]) => TService) | string;