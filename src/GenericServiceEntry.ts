import { Owner } from "./Owner";
import { Container } from "./Container";
import { ReuseScope } from "./ReuseScope";
import { ServiceEntry } from "./ServiceEntry";

class GenericServiceEntry<TService, TFunc> extends ServiceEntry implements IGenericRegistration<TService> {
    public instance: TService;
    private initializer: (container: Container, service: TService) => void;

    constructor(public factory: TFunc) {
        super();
    }

    public initializeInstance(instance: TService): void {
        var dynamicInstance: any = instance;

        if (this.reuse !== ReuseScope.none) {
            this.instance = instance;
        }

        if (this.owner === Owner.container && dynamicInstance.dispose) {
            this.container.trackDisposable(<IDisposable>dynamicInstance);
        }

        if (this.initializer) {
            this.initializer(this.container, instance);
        }
    }

    public initializedBy(initializer: Action<Container, TService>): IReusedOwned {
        this.initializer = initializer;
        return this;
    }

    public cloneFor(newContainer: Container): GenericServiceEntry<TService, TFunc> {
        return GenericServiceEntry.build<TService, TFunc>({
            reuse: this.reuse,
            owner: this.owner,
            factory: this.factory,
            container: newContainer,
            initializer: this.initializer
        });
    }

    public static build<TService, TFunc>(bag: { factory: TFunc, container: Container, reuse?: ReuseScope, owner?: Owner, instance?: TService, initializer?: Action<Container, TService> }) {
        var serviceEntry = new GenericServiceEntry<TService, TFunc>(bag.factory);

        serviceEntry.owner = bag.owner;
        serviceEntry.reuse = bag.reuse;
        serviceEntry.instance = bag.instance;
        serviceEntry.container = bag.container;
        serviceEntry.initializer = bag.initializer

        return serviceEntry;
    }
}

export { GenericServiceEntry };