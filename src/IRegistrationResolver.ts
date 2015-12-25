module TSFunq {
    export interface IRegistrationResolver {
        resolve<TService extends Function>(ctor: new () => TService): TService;
        tryResolve<TService extends Function>(ctor: new () => TService): TService;
        lazyResolve<TService extends Function>(ctor: new () => TService): () => TService;
        resolveNamed<TService extends Function>(ctor: new () => TService, name: string): TService;
        tryResolveNamed<TService extends Function>(ctor: new () => TService, name: string): TService;
        lazyResolveNamed<TService extends Function>(ctor: new () => TService, name: string): () => TService;
    }
}