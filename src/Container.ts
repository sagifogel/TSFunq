import { Args } from "./Args";
import { Owner } from "./Owner";
import { Dictionary } from "./Dictionary";
import { ReuseScope } from "./ReuseScope";
import { ServiceKey } from "./ServiceKey";
import { ServiceEntry } from "./ServiceEntry";
import { NameResolver } from "./NameResolver";
import { GenericServiceEntry } from "./GenericServiceEntry";

class Container implements IContainer {
    private parent: Container;
    private defaultOwner_: Owner = Owner.container;
    private disposables = new Array<IDisposable>();
    private childContainers = new Array<Container>();
    private defaultReuse_: ReuseScope = ReuseScope.container;
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

    public get defaultOwner(): Owner {
        return this.defaultOwner_;
    }

    public set defaultOwner(value: Owner) {
        this.defaultOwner_ = value;
    }

    public get defaultReuse(): ReuseScope {
        return this.defaultReuse_;
    }

    public set defaultReuse(value: ReuseScope) {
        this.defaultReuse_ = value;
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

            disposable["dispose"]();
        }

        while (this.childContainers.length > 0) {
            this.childContainers.shift()["dispose"]();
        }
    }

    public register<TService>(ctor: Constructor<TService>, factory: (container: IContainer) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1, TArg2>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9) => TService): IGenericRegistration<TService>;
    public register<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10) => TService): IGenericRegistration<TService>;
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

    public registerNamed<TService>(ctor: Constructor<TService>, name: string, factory: (container: IContainer) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1, TArg2>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9) => TService): IGenericRegistration<TService>;
    public registerNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string, factory: (container: IContainer, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10) => TService): IGenericRegistration<TService>;
    public registerNamed<TService>(ctor: Constructor<TService>, name: string, factory: Func<Container, TService>): IGenericRegistration<TService> {
        return this.registerImpl<TService, Func<Container, TService>>(ctor, name, factory);
    }

    private registerImpl<TService, TFunc extends Function>(ctor: Constructor<TService>, name: string, factory: TFunc): GenericServiceEntry<TService, TFunc> {
        let key: ServiceKey;
        let entry: GenericServiceEntry<TService, TFunc>;
        let resolveServiceName = `${name || ""}${this.arity(factory)}`;

        if (<any>ctor === Container) {
            throw new Error("Container service is built-in and read-only.");
        }

        entry = GenericServiceEntry.build<TService, TFunc>({
            container: this,
            factory: factory,
            reuse: this.defaultReuse_,
            owner: this.defaultOwner_
        });

        key = new ServiceKey(ctor, resolveServiceName);
        this.services.add(key, entry);

        return entry;
    }

    public resolve<TService>(ctor: Constructor<TService>): TService;
    public resolve<TService, TArg1>(ctor: Constructor<TService>, arg1: TArg1): TService;
    public resolve<TService, TArg1, TArg2>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2): TService;
    public resolve<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3): TService;
    public resolve<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, arg1?: TArg1, arg2?: TArg2, arg3?: TArg3, arg4?: TArg4): TService;
    public resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): TService;
    public resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): TService;
    public resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): TService;
    public resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): TService;
    public resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): TService;
    public resolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, arg1?: TArg1, arg2?: TArg2, arg3?: TArg3, arg4?: TArg4, arg5?: TArg5, arg6?: TArg6, arg7?: TArg7, arg8?: TArg8, arg9?: TArg9, arg10?: TArg10): TService {
        return this.resolveNamed(ctor, null, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
    }

    public resolveNamed<TService>(ctor: Constructor<TService>, name: string): TService;
    public resolveNamed<TService, TArg1>(ctor: Constructor<TService>, name: string, arg1: TArg1): TService;
    public resolveNamed<TService, TArg1, TArg2>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2): TService;
    public resolveNamed<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3): TService;
    public resolveNamed<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, name: string, arg1?: TArg1, arg2?: TArg2, arg3?: TArg3, arg4?: TArg4): TService;
    public resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): TService;
    public resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): TService;
    public resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): TService;
    public resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): TService;
    public resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): TService;
    public resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10): TService;
    public resolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string, arg1?: TArg1, arg2?: TArg2, arg3?: TArg3, arg4?: TArg4, arg5?: TArg5, arg6?: TArg6, arg7?: TArg7, arg8?: TArg8, arg9?: TArg9, arg10?: TArg10): TService {
        let args = Array.prototype.slice.call(arguments, 2);

        return this.resolveImpl<TService>(ctor, name, true, args);
    }

    public tryResolve<TService>(ctor: Constructor<TService>): TService;
    public tryResolve<TService, TArg1>(ctor: Constructor<TService>, arg1: TArg1): TService;
    public tryResolve<TService, TArg1, TArg2>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2): TService;
    public tryResolve<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3): TService;
    public tryResolve<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, arg1?: TArg1, arg2?: TArg2, arg3?: TArg3, arg4?: TArg4): TService;
    public tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): TService;
    public tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): TService;
    public tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): TService;
    public tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): TService;
    public tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): TService;
    public tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10): TService;
    public tryResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, arg1?: TArg1, arg2?: TArg2, arg3?: TArg3, arg4?: TArg4, arg5?: TArg5, arg6?: TArg6, arg7?: TArg7, arg8?: TArg8, arg9?: TArg9, arg10?: TArg10): TService {
        return this.tryResolveNamed(ctor, null, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
    }

    public tryResolveNamed<TService>(ctor: Constructor<TService>, name: string): TService;
    public tryResolveNamed<TService, TArg1>(ctor: Constructor<TService>, name: string, arg1: TArg1): TService;
    public tryResolveNamed<TService, TArg1, TArg2>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2): TService;
    public tryResolveNamed<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3): TService;
    public tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4): TService;
    public tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): TService;
    public tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): TService;
    public tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): TService;
    public tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): TService;
    public tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): TService;
    public tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10): TService;
    public tryResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string, arg1?: TArg1, arg2?: TArg2, arg3?: TArg3, arg4?: TArg4, arg5?: TArg5, arg6?: TArg6, arg7?: TArg7, arg8?: TArg8, arg9?: TArg9, arg10?: TArg10): TService {
        let args = Array.prototype.slice.call(arguments, 2);

        return this.resolveImpl<TService>(ctor, name, false, args);
    }

    public lazyResolve<TService>(ctor: Constructor<TService>): () => TService;
    public lazyResolve<TService, TArg1>(ctor: Constructor<TService>, arg1: TArg1): () => TService;
    public lazyResolve<TService, TArg1, TArg2>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2): () => TService;
    public lazyResolve<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3): () => TService;
    public lazyResolve<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4): () => TService;
    public lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5): () => TService;
    public lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): () => TService;
    public lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7): () => TService;
    public lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8): () => TService;
    public lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9): () => TService;
    public lazyResolve<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, arg1?: TArg1, arg2?: TArg2, arg3?: TArg3, arg4?: TArg4, arg5?: TArg5, arg6?: TArg6, arg7?: TArg7, arg8?: TArg8, arg9?: TArg9, arg10?: TArg10): () => TService {
        return this.lazyResolveNamed<TService>(ctor, null);
    }

    public lazyResolveNamed<TService>(ctor: Constructor<TService>, name: string): () => TService;
    public lazyResolveNamed<TService, TArg1>(ctor: Constructor<TService>, name: string): (arg1: TArg1) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2, TArg3>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string): (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6, arg7: TArg7, arg8: TArg8, arg9: TArg9, arg10: TArg10) => TService;
    public lazyResolveNamed<TService, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(ctor: Constructor<TService>, name: string): (arg1?: TArg1, arg2?: TArg2, arg3?: TArg3, arg4?: TArg4, arg5?: TArg5, arg6?: TArg6, arg7?: TArg7, arg8?: TArg8, arg9?: TArg9, arg10?: TArg10) => TService {
        return function (): TService {
            let args: Array<any> = Array.prototype.slice.call(arguments);
            let resolvedName = this.resolveServiceName(name, args);

            this.throwIfNotRegistered(ctor, resolvedName);

            return this.resolveNamed.apply(this, [ctor, name].concat(args));
        }.bind(this);
    }

    private resolveImpl<TService>(ctor: Constructor<TService>, name: string, throwIfMissing: boolean, args: Array<any>): TService {
        let instance: TService;
        let entry = this.getEntry<TService, Func<Container, TService>>(ctor, this.resolveServiceName(name, args), throwIfMissing);

        if (!entry) {
            return null;
        }

        instance = entry.instance;

        if (!instance) {
            args = args || [];
            args.splice(0, 0, entry.container);
            instance = entry.factory.apply(null, args);
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

    private lenToStr(length: number): string {
        return length.toString();
    }

    private arity(fn: Function): string {
        let length = 0;

        if (fn) {
            length = fn.length - 1;
        }

        return this.lenToStr(length);
    }

    private resolveServiceName(name: string, args: Array<any>): string {
        let slicedArgs = Args.sliceArray(args);

        return `${name || ""}${this.lenToStr(slicedArgs.length)}`;
    }

    public trackDisposable(instance: IDisposable): void {
        this.disposables.push(instance);
    }
}

export { Container };