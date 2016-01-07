﻿import { Owner } from "./Owner";
import { Dictionary } from "./Dictionary";
import { ServiceKey } from "./ServiceKey";
import { ReuseScope } from "./ReuseScope";
import { ServiceEntry } from "./ServiceEntry";
import { NameResolver } from "./NameResolver";
import { GenericServiceEntry } from "./GenericServiceEntry";

class Container implements IContainer {
    private parent: Container;
    private defaultOwner = Owner.container;
    private defaultReuse = ReuseScope.container;
    private disposables = new Array<IDisposable>();
    private childContainers = new Array<Container>();
    private services = new Dictionary<ServiceKey, ServiceEntry>();

    constructor() {
        let serviceEntry = GenericServiceEntry.build<Container, Func<Container, Container>>({
            instance: this,
            factory: c => c,
            container: this,
            owner: Owner.external,
            reuse: ReuseScope.container
        });

        this.services.add(new ServiceKey(Container), serviceEntry);
    }

    public createChildContainer(): Container {
        let child = new Container();

        child.parent = this;
        this.childContainers.push(child);

        return child;
    }

    public dispose(): void {
        while (this.disposables.length > 0) {
            let disposable = this.disposables.shift();

            disposable.dispose();
        }

        while (this.childContainers.length > 0) {
            this.childContainers.shift().dispose();
        }
    }

    public register<TService>(ctor: Constructor<TService>, factory: Func<Container, TService>): IGenericRegistration<TService> {
        return this.registerNamed(ctor, null, factory);
    }

    public registerInstance<TService>(instance: TService): void {
        this.registerNamedInstance<TService>(null, instance);
    }

    public registerNamedInstance<TService>(name: string, instance: TService): void {
        let proto = Object.getPrototypeOf(instance);
        let ctor = <new () => TService>proto.constructor;
        let entry = this.registerImpl<TService, Func<Container, TService>>(ctor, name, null);

        entry.reusedWithin(ReuseScope.hierarchy)
            .ownedBy(Owner.external);

        entry.initializeInstance(instance);
    }

    public registerNamed<TService>(ctor: Constructor<TService>, name: string, factory: Func<Container, TService>): IGenericRegistration<TService> {
        return this.registerImpl<TService, Func<Container, TService>>(ctor, name, factory);
    }

    private registerImpl<TService, TFunc>(ctor: Constructor<TService>, name: string, factory: TFunc): GenericServiceEntry<TService, TFunc> {
        let key: ServiceKey;
        let entry: GenericServiceEntry<TService, TFunc>;

        if (<any>ctor === Container) {
            throw new Error("Container service is built-in and read-only.");
        }

        entry = GenericServiceEntry.build<TService, TFunc>({
            container: this,
            factory: factory,
            reuse: this.defaultReuse,
            owner: this.defaultOwner
        });

        key = new ServiceKey(ctor, name);
        this.services.add(key, entry);

        return entry;
    }

    public resolve<TService>(ctor: Constructor<TService>): TService {
        return this.resolveNamed<TService>(ctor, null);
    }

    public resolveNamed<TService>(ctor: Constructor<TService>, name: string): TService {
        return this.resolveImpl<TService>(ctor, name, true);
    }

    public tryResolve<TService>(ctor: Constructor<TService>): TService {
        return this.tryResolveNamed<TService>(ctor, null);
    }

    public tryResolveNamed<TService>(ctor: Constructor<TService>, name: string): TService {
        return this.resolveImpl<TService>(ctor, name, false);
    }

    public lazyResolve<TService>(ctor: Constructor<TService>): () => TService {
        return this.lazyResolveNamed<TService>(ctor, null);
    }

    public lazyResolveNamed<TService>(ctor: Constructor<TService>, name: string): () => TService {
        this.throwIfNotRegistered<TService, Func<Container, TService>>(ctor, name);

        return () => this.resolveNamed<TService>(ctor, name);
    }

    private resolveImpl<TService>(ctor: Constructor<TService>, name: string, throwIfMissing: boolean): TService {
        let instance: TService;
        let entry = this.getEntry<TService, Func<Container, TService>>(ctor, name, throwIfMissing);

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

    private getEntry<TService, TFunc>(ctor: Constructor<TService>, serviceName: string, throwIfMissing: boolean): GenericServiceEntry<TService, TFunc> {
        let container: Container = this;
        let entry: ServiceEntry;
        let key = new ServiceKey(ctor, serviceName);
        let outResult = <{ out: any }>{};

        while (!container.services.tryGetValue(key, outResult) && container.parent) {
            container = container.parent;
        }

        entry = outResult.out;

        if (entry) {
            if (entry.reuse === ReuseScope.container && entry.container !== this) {
                entry = (<GenericServiceEntry<TService, TFunc>>entry).cloneFor(this);
                this.services.add(key, entry);
            }
        }
        else if (throwIfMissing) {
            this.throwMissing(ctor, serviceName)
        }

        return <GenericServiceEntry<TService, TFunc>>entry;
    }

    private throwMissing<TService>(ctor: Constructor<TService>, serviceName: string) {
        let buffer: Array<string> = [`Required dependency of type ${NameResolver.resolve(ctor)}`];

        if (serviceName) {
            buffer.push(` named ${serviceName}`);
        }

        buffer.push(" could not be resolved.");
        throw new Error(buffer.join(""));
    }

    private throwIfNotRegistered<TService, TFunc>(ctor: Constructor<TService>, name: string): void {
        this.getEntry<TService, TFunc>(ctor, name, true);
    }

    public trackDisposable(instance: IDisposable): void {
        this.disposables.push(instance);
    }
}

export { Container };