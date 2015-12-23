/// <reference path="owner.ts" />
/// <reference path="reusescope.ts" />
/// <reference path="serviceenrty.ts" />
/// <reference path="syntax.ts" />
/// <reference path="container.ts" />

module TSFunq {
    export class GenericServiceEntry<TService, TFunc> extends ServiceEntry implements IGenericRegistration<TService> {
        public instance: TService;
        initializer: (container: Container, service: TService) => void;

        constructor(public factory: TFunc) {
            super();
        }

        initializeInstance(instance: TService): void {
            var dynamicInstance: any = instance;

            if (this.reuse != ReuseScope.None) {
                this.instance = instance;
            }

            if (this.owner == Owner.Container && dynamicInstance.dispose) {
                this.container.trackDisposable(<IDisposable>dynamicInstance);
            }

            if (this.initializer) {
                this.initializer(this.container, instance);
            }
        }

        initializedBy(initializer: (container: Container, service: TService) => void): IReusedOwned {
            this.initializer = initializer;
            return this;
        }

        cloneFor(newContainer: Container): GenericServiceEntry<TService, TFunc> {
            return GenericServiceEntry.build<TService, TFunc>({
                reuse: this.reuse,
                owner: this.owner,
                factory: this.factory,
                container: newContainer,
                initializer : this.initializer,
            });
        }

        static build<TService, TFunc>(bag: { factory: TFunc, container: Container, reuse?: ReuseScope, owner?: Owner, instance?: TService }) {
            var serviceEntry = new GenericServiceEntry<TService, TFunc>(bag.factory);

            serviceEntry.container = bag.container;
            serviceEntry.instance = bag.instance;
            serviceEntry.owner = bag.owner;
            serviceEntry.reuse = bag.reuse;

            return serviceEntry;
        }
    }
}
