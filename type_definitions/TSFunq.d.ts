﻿declare namespace TSFunq {
    export enum Owner {
        container = 0,
        external = 1
    }

    export enum ReuseScope {
        container = 0,
        hierarchy = 1,
        none = 2
    }

    export interface IDisposable {
        dispose(): void;
    }

    export interface IOwned {
        ownedBy(owner: Owner): void;
    }

    export interface IReused {
        reusedWithin(scope: ReuseScope): IOwned;
    }

    export interface IReusedOwned extends IReused, IOwned {
    }

    export interface IRegistration extends IReusedOwned {
    }

    export interface IGenericRegistration<TService> extends IRegistration, IInitializable<TService> {
    }

    export interface IInitializable<TService> {
        initializedBy(initializer: Action<IRegistrationResolver, TService>): IReusedOwned;
    }

    interface IRegistry {
        registerInstance<TService>(instance: TService): void;
        registerNamedInstance<TService>(name: string, instance: TService): void;
        register<TService>(ctor: Constructor<TService>, factory: (container: IContainer) => TService): IGenericRegistration<TService>;
        register<TService, TArg1>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1) => TService): IGenericRegistration<TService>;
        register<TService, TArg1, TArg2>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2) => TService): IGenericRegistration<TService>;
        register<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3) => TService): IGenericRegistration<TService>;
        register<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4) => TService): IGenericRegistration<TService>;
        register<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5) => TService): IGenericRegistration<TService>;
        register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6) => TService): IGenericRegistration<TService>;
        register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7) => TService): IGenericRegistration<TService>;
        register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8) => TService): IGenericRegistration<TService>;
        register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9) => TService): IGenericRegistration<TService>;
        register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10) => TService): IGenericRegistration<TService>;
        registerNamed<TService>(ctor: Constructor<TService>, name: string, factory: (container: IContainer) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1, TArg2>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9) => TService): IGenericRegistration<TService>;
        registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10) => TService): IGenericRegistration<TService>;
    }

    export interface IRegistrationResolver {
        resolve<TService>(ctor: Constructor<TService>): TService;
        resolve<TService, TArg1>(ctor: Constructor<TService>, arg1: TArg1): TService;
        resolve<TService, TArg1, TArg2>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2): TService;
        resolve<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3): TService;
        resolve<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4): TService;
        resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): TService;
        resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): TService;
        resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): TService;
        resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): TService;
        resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): TService;
        resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10): TService;
        tryResolve<TService>(ctor: Constructor<TService>): TService;
        tryResolve<TService, TArg1>(ctor: Constructor<TService>, arg1: TArg1): TService;
        tryResolve<TService, TArg1, TArg2>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2): TService;
        tryResolve<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, arg1: TArg1, arg: TArg2, arg3: TArg3): TService;
        tryResolve<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4): TService;
        tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): TService;
        tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): TService;
        tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): TService;
        tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): TService;
        tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): TService;
        tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10): TService;
        resolveNamed<TService>(ctor: Constructor<TService>, name: string): TService;
        resolveNamed<TService, TArg1>(ctor: Constructor<TService>, name: string, arg1: TArg1): TService;
        resolveNamed<TService, TArg1, TArg2>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2): TService;
        resolveNamed<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3): TService;
        resolveNamed<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4): TService;
        resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): TService;
        resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): TService;
        resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): TService;
        resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): TService;
        resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): TService;
        resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10): TService;
        tryResolveNamed<TService>(ctor: Constructor<TService>, name: string): TService;
        tryResolveNamed<TService, TArg1>(ctor: Constructor<TService>, name: string, arg1: TArg1): TService;
        tryResolveNamed<TService, TArg1, TArg2>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2): TService;
        tryResolveNamed<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3): TService;
        tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4): TService;
        tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): TService;
        tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): TService;
        tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): TService;
        tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): TService;
        tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): TService;
        tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10): TService;
        lazyResolve<TService>(ctor: Constructor<TService>): () => TService;
        lazyResolve<TService, TArg1>(ctor: Constructor<TService>, arg1: TArg1): () => TService;
        lazyResolve<TService, TArg1, TArg2>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2): () => TService;
        lazyResolve<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3): () => TService;
        lazyResolve<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4): () => TService;
        lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): () => TService;
        lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): () => TService;
        lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): () => TService;
        lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): () => TService;
        lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): () => TService;
        lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10): () => TService;
        lazyResolveNamed<TService>(ctor: Constructor<TService>, name: string): () => TService;
        lazyResolveNamed<TService, TArg1>(ctor: Constructor<TService>, name: string): (arg1: TArg1) => TService;
        lazyResolveNamed<TService, TArg1, TArg2>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2) => TService;
        lazyResolveNamed<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3) => TService;
        lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4) => TService;
        lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5) => TService;
        lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6) => TService;
        lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7) => TService;
        lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8) => TService;
        lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9) => TService;
        lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10) => TService;
    }

    export interface IContainer extends IRegistrationResolver, IRegistry, IDisposable {
        defaultOwner: Owner;
        defaultReuse: ReuseScope;
        createChildContainer(): IContainer;
    }

    export interface IContainerConstructor {
        new (): IContainer;
    }

    export let Container: IContainerConstructor;
    export type Action<T1, T2> = (arg1: T1, arg2: T2) => void;
    export type Constructor<TService> = (new (...args: any[]) => TService) | string;
}

declare module "tsfunq" {
    export = TSFunq;
}