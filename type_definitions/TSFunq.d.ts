declare module "TSFunq" {
    export module TSFunq {
        export class Container implements IRegistry, IRegistrationResolver, IDisposable {
            dispose(): void;
            registerInstance<TService>(instance: TService): void;
            resolve<TService>(ctor: new () => TService): TService;
            tryResolve<TService>(ctor: new () => TService): TService;
            lazyResolve<TService>(ctor: new () => TService): () => TService;
            registerNamedInstance<TService>(name: string, instance: TService): void;
            resolveNamed<TService>(ctor: new () => TService, name: string): TService;
            tryResolveNamed<TService>(ctor: new () => TService, name: string): TService;
            lazyResolveNamed<TService>(ctor: new () => TService, name: string): () => TService;
            register<TService>(ctor: { new (): TService; }, factory: Func<IRegistrationResolver, TService>): IGenericRegistration<TService>;
            registerNamed<TService>(ctor: { new (): TService; }, name: string, factory: Func<IRegistrationResolver, TService>): IGenericRegistration<TService>;
        }
    }
} 