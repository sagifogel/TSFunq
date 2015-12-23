/// <reference path="genericserviceentry.ts" />
/// <reference path="stack.ts" />
/// <reference path="dictionary.ts" />
/// <reference path="owner.ts" />
/// <reference path="serviceenrty.ts" />
/// <reference path="servicekey.ts" />
/// <reference path="syntax.ts" />
/// <reference path="idisposable.ts" />
/// <reference path="reusescope.ts" />
/// <reference path="resolutionexception.ts" />

module TSFunq {
    export class Container implements IDisposable {
        parent: Container;
        defaultOwner = Owner.Container;
        defaultReuse = ReuseScope.Container;
        disposables = new Stack<IDisposable>();
        childContainers = new Stack<Container>();
        services = new Dictionary<ServiceKey, ServiceEntry>();

        constructor() {
            var serviceEntry = GenericServiceEntry.build<Container, (container: Container) => Container>({
                inatnce: this,
                factory: c => c,
                container: this,
                owner: Owner.External,
                reuse: ReuseScope.Container
            });

            this.services.add(new ServiceKey(Container), serviceEntry);
        }

        createChildContainer(): Container {
            var child = new Container();

            child.parent = this;
            this.childContainers.push(child);

            return child;
        }

        dispose(): void {
            while (this.disposables.length > 0) {
                let disposable = this.disposables.pop();

                disposable.dispose();
            }

            while (this.childContainers.length > 0) {
                this.childContainers.pop().dispose();
            }
        }

        register<TService>(ctor: { new (): TService; }, factory: (container: Container) => TService): IGenericRegistration<TService> {
            return this.registerNamed(ctor, null, factory);
        }

        registerNamed<TService>(ctor: { new (): TService; }, name: string, factory: (container: Container) => TService): IGenericRegistration<TService> {
            return this.registerImpl<TService, (container: Container) => TService>(ctor, name, factory);
        }

        registerImpl<TService, TFunc>(ctor: new () => TService, name: string, factory: TFunc): GenericServiceEntry<TService, TFunc> {
            var key: ServiceKey;
            var entry = GenericServiceEntry.build<TService, TFunc>({
                container: this,
                factory: factory,
                reuse: this.defaultReuse,
                owner: this.defaultOwner
            });

            key = new ServiceKey(ctor, name);
            this.services.add(key, entry);

            return entry;
        }

        resolve<TService>(ctor: new () => TService): TService {
            return this.resolveNamed<TService>(ctor, null);
        }

        resolveNamed<TService>(ctor: new () => TService, name: string): TService {
            return this.resolveImpl<TService>(ctor, name, true);
        }

        tryResolve<TService>(ctor: new () => TService): TService {
            return this.tryResolveNamed<TService>(ctor, null);
        }

        tryResolveNamed<TService>(ctor: new () => TService, name: string): TService {
            return this.resolveImpl<TService>(ctor, name, false);
        }

        lazyResolve<TService>(ctor: new () => TService): () => TService {
            return this.lazyResolveNamed<TService>(ctor, null);
        }

        lazyResolveNamed<TService>(ctor: new () => TService, name: string): () => TService {
            this.throwIfNotRegistered<TService, (container: Container) => TService>(ctor, name);

            return () => this.resolveNamed<TService>(ctor, name);
        }

        resolveImpl<TService>(ctor: new () => TService, name: string, throwIfMissing: boolean): TService {
            var instance: TService;
            var entry = this.getEntry<TService, (container: Container) => TService>(ctor, name, throwIfMissing);

            if (!entry) {
                return null;
            }

            instance = entry.instance;

            if (!instance) {
                instance = entry.factory(entry.container);
                entry.initializeInstance(instance);
            }

            return instance;
        }

        getEntry<TService, TFunc>(ctor: new () => TService, serviceName: string, throwIfMissing: boolean): GenericServiceEntry<TService, TFunc> {
            var container = this;
            var entry: ServiceEntry;
            var key = new ServiceKey(ctor, serviceName);
            var outResult = <{ out: any }>{};

            while (!container.services.tryGetValue(key, outResult) && container.parent) {
                container = container.parent;
            }

            entry = outResult.out;

            if (entry) {
                if (entry.reuse == ReuseScope.Container && entry.container != this) {
                    entry = (<GenericServiceEntry<TService, TFunc>>entry).cloneFor(this);
                    this.services.add(key, entry);
                }
            }
            else if (throwIfMissing) {
                Container.throwMissing<TService>(ctor, serviceName);
            }

            return <GenericServiceEntry<TService, TFunc>>entry;
        }

        static throwMissing<TService>(ctor: new () => TService, serviceName: string): void {
            if (!serviceName) {
                throw new ResolutionException(ctor);
            }
            else {
                throw new ResolutionException(ctor, serviceName);
            }
        }

        throwIfNotRegistered<TService, TFunc>(ctor: new () => TService, name: string): void {
            this.getEntry<TService, TFunc>(ctor, name, true);
        }

        trackDisposable(instance: IDisposable): void {
            this.disposables.push(instance);
        }
    }
}