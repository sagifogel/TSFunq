module TSFunq {
    export interface IRegistry {
        registerInstance<TService extends Function>(instance: TService): void;
        registerNamedInstance<TService extends Function>(name: string, instance: TService): void;
        register<TService extends Function>(ctor: { new (): TService; }, factory: Func<Container, TService>): IGenericRegistration<TService>;
        registerNamed<TService extends Function>(ctor: { new (): TService; }, name: string, factory: Func<Container, TService>): IGenericRegistration<TService>;
    }
}