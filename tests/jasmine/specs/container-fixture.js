//var TSFunq = require("../../../build/TSFunq");
//var Subjects = require("../subjects");

describe("ShouldRegister", function () {
    it("should register a factory and should resolve an instance of the registered type", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); });
        foo = container.resolve(Foo);

        expect(foo).not.toBeNull();
    });
});

describe("RegisteredInstanceIsResolved", function () {
    it("should register a an instance and resolved the same insatnce as the registered one", function () {
        var f2;
        var f1 = new Foo();
        var container = new TSFunq.Container();

        container.registerInstance(f1);
        f2 = container.resolve(Foo);

        expect(f1).toBe(f2);
    });
});

describe("ThrowsIfCannotResolve", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();

        try {
            foo = container.resolve(Foo);
            fail("Should have thrown ResolutionException");
        }
        catch (re) {
        }
    });
});

describe("ThrowsIfCannotResolveNamed", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();

        try {
            foo = container.resolveNamed(Foo, "foo");
            fail("Should have thrown ResolutionException");
        }
        catch (re) {
            expect(re.message.indexOf("foo")).not.toEqual(-1);
        }
    });
});

describe("RegistersDelegateForType", function () {
    it("should register a factory for a specific type and resolve an instance using its factory", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); });
        foo = container.resolve(Foo);

        expect(foo).not.toBeNull();
        expect(foo.constructor).toEqual(Foo);
    });
});

describe("RegistersNamedFactories", function () {
    it("should regiter two named factories for the same type and resolve two different instances", function () {
        var foo;
        var foo2;
        var container = new TSFunq.Container();

        container.registerNamed(Foo, "foo", function (c) { return new Foo(); });
        container.registerNamed(Foo, "foo2", function (c) { return new Foo(); });
        foo = container.resolveNamed(Foo, "foo");
        foo2 = container.resolveNamed(Foo, "foo2");

        expect(foo).not.toBe(foo2);
        expect(foo.constructor).toEqual(Foo);
        expect(foo2.constructor).toEqual(Foo);
    });
});

describe("RegisterOrderForNamedDoesNotMatter", function () {
    it("should register two factories for the same type, which one of them is named factory and should resolve eachone using its factory", function () {
        var foo;
        var foo2;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); });
        container.registerNamed(Foo, "foo", function (c) { return new Foo("foo"); });
        foo = container.resolve(Foo);
        foo2 = container.resolveNamed(Foo, "foo");

        expect(foo).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo2.value).toEqual("foo");
    });
});

describe("TryResolveReturnsNullIfNotRegistered", function () {
    it("should return null and not throw a ResolutionException when type is not registered", function () {
        var container = new TSFunq.Container();
        var foo = container.tryResolve(Foo);

        expect(foo).toBeNull();
    });
});

describe("TryResolveNamedReturnsNullIfNotRegistered", function () {
    it("should return null and not throw a ResolutionException when type is not registered", function () {
        var container = new TSFunq.Container();
        var foo = container.tryResolveNamed(Foo, "foo");

        expect(foo).toBeNull();
    });
});

describe("TryResolveReturnsRegisteredInstance", function () {
    it("should resolve an instance when using the tryResolve[...] API", function () {
        var bar;
        var container = new TSFunq.Container();

        container.registerNamed(Bar, "bar", function (c) { return new Bar(); });
        bar = container.tryResolveNamed(Bar, "bar");
        expect(bar).not.toBeNull();
    });
});

describe("TryResolveReturnsRegisteredInstanceOnParent", function () {
    it("should create container and a child container and to resolve an instance using the child container's tryResolve[...] API", function () {
        var bar;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();

        container.registerNamed(Bar, "bar", function (c) { return new Bar(); });
        bar = child.tryResolveNamed(Bar, "bar");

        expect(bar).not.toBeNull();
    });
});

describe("LatestRegistrationOverridesPrevious", function () {
    it("should register two factories for the same type, thus overridng the previous one, and resolve an instance using the last factory", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); });
        container.register(Foo, function (c) { return new Foo("foo"); });
        foo = container.resolve(Foo)

        expect(foo.value).toEqual("foo");
    });
});

describe("DisposesContainerOwnedInstances", function () {
    it("should register two disposable instances and mark only one of them to be owned by container. calling the dispose on the container will dispose only the marked one", function () {
        var containerOwned;
        var externallyOwned;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); }).ownedBy(TSFunq.Owner.container);
        container.register(Base, function (c) { return new Disposable(); }).ownedBy(TSFunq.Owner.external);
        containerOwned = container.resolve(Disposable);
        externallyOwned = container.resolve(Base);
        container.dispose();

        expect(containerOwned.isDisposed).toBeTruthy();
        expect(externallyOwned.isDisposed).toBeFalsy();
    });
});

describe("ChildContainerCanReuseRegistrationsOnParent", function () {
    it("should register a factory on a container, create a child container and resolve an instance using the child container", function () {
        var foo;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();

        container.register(Foo, function (c) { return new Foo(); })
        foo = child.resolve(Foo);

        expect(foo).not.toBeNull();
    });
});

describe("NoReuseCreatesNewInstancesAlways", function () {
    it("should register a none reused factory and resolve two different instances", function () {
        var foo1;
        var foo2;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); }).reusedWithin(TSFunq.ReuseScope.none);
        foo1 = container.resolve(Foo);
        foo2 = container.resolve(Foo);

        expect(foo1).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo1).not.toBe(foo2);
    });
});

describe("ContainerScopedInstanceIsReused", function () {
    it("should register a reused factory within container and resolve the same instance multiple times", function () {
        var foo1;
        var foo2;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); }).reusedWithin(TSFunq.ReuseScope.container);
        foo1 = container.resolve(Foo);
        foo2 = container.resolve(Foo);

        expect(foo1).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo1).toBe(foo2);
    });
});

describe("HierarchyScopedInstanceIsReusedOnSameContainer", function () {
    it("should register a reused factory within hierarchy and resolve the same instance multiple times", function () {
        var foo1;
        var foo2;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); }).reusedWithin(TSFunq.ReuseScope.hierarchy);
        foo1 = container.resolve(Foo);
        foo2 = container.resolve(Foo);

        expect(foo1).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo1).toBe(foo2);
    });
});

describe("HierarchyScopedInstanceIsReusedFromParentContainer", function () {
    it("should register a reused factory within hierarchy, create a child container and resolve the same instance from the parent and the child containers", function () {
        var foo1;
        var foo2;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();

        parent.register(Foo, function (c) { return new Foo(); }).reusedWithin(TSFunq.ReuseScope.hierarchy);
        foo1 = parent.resolve(Foo);
        foo2 = child.resolve(Foo);

        expect(foo1).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo1).toEqual(foo2);
    });
});

describe("HierarchyScopedInstanceIsCreatedOnRegistrationContainer", function () {
    it("should register a reused factory within hierarchy of a disposble type, create a child container and resolve the instance from child container, then call the dispose function of the parent container and verify that the instance was not disposed", function () {
        var childFoo;
        var parentFoo;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();

        parent.register(Disposable, function (c) { return new Disposable(); }).reusedWithin(TSFunq.ReuseScope.hierarchy);
        childFoo = child.resolve(Disposable);
        parentFoo = parent.resolve(Disposable);
        child.dispose();

        expect(parentFoo).not.toBeNull();
        expect(childFoo).not.toBeNull();
        expect(parentFoo.isDisposed).toBeFalsy();
    });
});

describe("ContainerScopedInstanceIsNotReusedFromParentContainer", function () {
    it("should register a reused factory within container, create a child container and resolve different instances from the parent and the child container", function () {
        var foo1;
        var foo2;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();

        parent.register(Foo, function (c) { return new Foo(); }).reusedWithin(TSFunq.ReuseScope.container);
        foo1 = parent.resolve(Foo);
        foo2 = child.resolve(Foo);

        expect(foo1).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo1).not.toBe(foo2);
    });
});
describe("DisposingParentContainerDisposesChildContainerAndInstances", function () {
    it("should register two reused factories which one of them is within hierarchy and the second within container, create a child, resolve all instances and dispose the child container. All instances should be disposed", function () {
        var childFoo;
        var parentFoo;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();

        parent.register(Disposable, function (c) { return new Disposable(); }).reusedWithin(TSFunq.Owner.hierarchy);
        parent.register(Base, function (c) { return new Disposable(); }).reusedWithin(TSFunq.Owner.container);
        parentFoo = parent.resolve(Disposable);
        childFoo = child.resolve(Base);
        parent.dispose();

        expect(parentFoo.isDisposed).toBeTruthy();
        expect(childFoo.isDisposed).toBeTruthy();
    });
});

describe("ContainerOwnedNonReuseInstacesAreDisposed", function () {
    it("should register a factory of a disposable type which is not reused and owned by container, resolve an instance  and call the dispose funcion. The resolved type should be disposed", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.none)
                 .ownedBy(TSFunq.Owner.container);

        foo = container.resolve(Disposable);
        container.dispose();

        expect(foo.isDisposed).toBeTruthy();
    });
});

describe("ContainerOwnedAndContainerReusedInstacesAreDisposed", function () {
    it("should register a factory of a disposable type which is reused and owned by container, resolve an instance and call the dispose funcion. The resolved type should be disposed", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.container)
                 .ownedBy(TSFunq.Owner.container);

        foo = container.resolve(Disposable);
        container.dispose();

        expect(foo.isDisposed).toBeTruthy();
    });
});

describe("ContainerOwnedAndHierarchyReusedInstacesAreDisposed", function () {
    it("should register a factory of a disposable type which is reused within hierarchy and owned by container, resolve an instance and call the dispose funcion. The resolved type should be disposed", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy)
                 .ownedBy(TSFunq.Owner.container);

        foo = container.resolve(Disposable);
        container.dispose();

        expect(foo.isDisposed).toBeTruthy();
    });
});

describe("ChildContainerInstanceWithParentRegistrationIsDisposed", function () {
    it("should register a factory of a disposable type which is reused within hierarchy and owned by container, create child container, resolve an instance from the child container and call the dispose funcion on of the child container. The resolved type should not be disposed", function () {
        var foo;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();

        parent.register(Disposable, function (c) { return new Disposable(); })
              .reusedWithin(TSFunq.ReuseScope.hierarchy)
              .ownedBy(TSFunq.Owner.container);

        foo = child.resolve(Disposable);
        child.dispose();

        expect(foo.isDisposed).toBeFalsy();
    });
});

describe("DisposingParentContainerDisposesChildContainerInstances", function () {
    it("should register a factory of a disposable type which is reused within hierarchy and owned by container, create child container, resolve an instance from the child container and call the dispose funcion on of the child container. The resolved type should not be disposed", function () {
        var foo;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();

        parent.register(Disposable, function (c) { return new Disposable(); })
              .reusedWithin(TSFunq.ReuseScope.none)
              .ownedBy(TSFunq.Owner.container);

        foo = child.resolve(Disposable);
        parent.dispose();

        expect(foo.isDisposed).toBeTruthy();
    });
});

describe("DisposingContainerDoesNotDisposeExternalOwnedInstances", function () {
    it("should register a factory of a disposable type which is reused within hierarchy and owned externaly, resolve an instance and call the dispose funcion. The resolved type should not be disposed", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy)
                 .ownedBy(TSFunq.Owner.external);

        foo = container.resolve(Disposable);
        container.dispose();

        expect(foo.isDisposed).toBeFalsy();
    });
});

describe("InitializerCalledWhenInstanceCreatedContainerReuse", function () {
    it("should register a factory of a initializable type which is reused within container, call the resolve multiple times and resolve the same instance. The initialization function should be called only once", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();

        container.register(Initializable, function (c) { return new Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.container);

        i1 = container.resolve(Initializable);
        i2 = container.resolve(Initializable);

        expect(i1).toBe(i2);
        expect(1).toEqual(i1.initializeCalls);
    });
});

describe("InitializerCalledWhenInstanceCreatedHierarchyReuse", function () {
    it("should register a factory of a initializable type which is reused within hierarchy, call the resolve multiple times and resolve the same instance. The initialization function should be called only once", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();

        container.register(Initializable, function (c) { return new Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy);

        i1 = container.resolve(Initializable);
        i2 = container.resolve(Initializable);

        expect(i1).toBe(i2);
        expect(1).toEqual(i1.initializeCalls);
    });
});

describe("InitializerCalledWhenInstanceCreatedNoReuse", function () {
    it("should register a factory of a initializable type which is not reused, resolve different instances, but invoke the initialization function only once", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();

        container.register(Initializable, function (c) { return new Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.none);

        i1 = container.resolve(Initializable);
        i2 = container.resolve(Initializable);

        expect(i1).not.toBe(i2);
        expect(1).toEqual(i1.initializeCalls);
        expect(1).toEqual(i2.initializeCalls);
    });
});

describe("InitializerCalledOnChildContainerWhenInstanceCreated", function () {
    it("should register a factory of a initializable type which which is reused within container, create a child container and resolve the same instances using the child container. The initialization function should be called only once", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();

        container.register(Initializable, function (c) { return new Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.container);

        i1 = child.resolve(Initializable);
        i2 = child.resolve(Initializable);

        expect(i1).toBe(i2);
        expect(1).toEqual(i1.initializeCalls);
    });
});

describe("InitializerCanRetrieveResolvedDependency", function () {
    it("should register two factories for two types that each one is dependent upon the other. One of the registrations includes an initialization phase. The initialization function should resolve the circular dependency issue", function () {
        var view;
        var presenter;
        var container = new TSFunq.Container();

        container.register(Presenter, function (c) { return new Presenter(c.resolve(View)); })
        container.register(View, function (c) { return new View(); })
                 .initializedBy(function (c, v) { v.presenter = c.resolve(Presenter); });

        view = container.resolve(View);
        presenter = container.resolve(Presenter);

        expect(view.presenter).toBe(presenter);
    });
});

describe("InitializerCalledOnEntryContainer", function () {
    it("should register two factories for two types that each one is dependent upon the other. One of the registrations includes an initialization phase. The initailized registraion will be reused withing hierarchy which means that the itialization function should not resolve the circular dependency issue. A ResolutionExcepton should be thrown", function () {
        var view;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();
        // Notice the purposedful error: we register the view 
        // on the parent container, but the presenter in 
        // the child. Since the reuse is hierarchy, the view 
        // will be created on the parent, and thus the 
        // initializer should NOT be able to resolve 
        // the presenter, which lives in the child container.

        container.register(View, function (c) { return new View(); })
                 .initializedBy(function (c, v) { v.presenter = c.resolve(Presenter); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy);

        child.register(Presenter, function (c) { return new Presenter(c.resolve(View)); });

        try {
            view = child.resolve(View);
            fail("Should have thrown as presenter is registered on child and initializer runs on parent");
        }
        catch (ResolutionException) {
        }
    });
});
/*
describe("ThrowsIfRegisterContainerService", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var view;
        var container = new TSFunq.Container();

        try {
            container.register(function (c) { return new TSFunq.Container() });
            fail("Should have thrown when registering a Container service.");
        }
        catch (ArgumentException) {
        }
    });
});

describe("ShouldGetContainerServiceAlways", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var view;
        var container = new TSFunq.Container();
        var service = container.resolve(TSFunq.Container);

        expect(service).not.toBeNull();
    });
});

describe("ShouldGetSameContainerServiceAsCurrentContainer", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var view;
        var service;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();
        var grandChild = child.createChildContainer();

        service = container.resolve(TSFunq.Container);
        expect(container).toBeEqual(service);

        service = child.resolve(TSFunq.Container);
        expect(child).toBeEqual(service);

        service = grandChild.resolve(TSFunq.Container);
        expect(grandChild).toBeEqual(service);
    });
});

describe("DefaultReuseCanBeSpecified", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var f1;
        var f2
        var container = new TSFunq.Container();

        container.defaultReuse = TSFunq.ReuseScope.none;
        container.Register(Foo, function (c) { return new Foo(); });
        f1 = container.resolve(Foo);
        f2 = container.resolve(Foo);

        expect(f1).not.toBeEqual(f2);
    });
});

describe("DefaultOwnerCanBeSpecified", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var d;
        var container = new TSFunq.Container();

        container.defaultOwner = TSFunq.Owner.external;
        container.Register(Disposable, function (c) { return new Disposable(); });
        d = container.resolve(Disposable);
        container.dispose();

        expect(d.isDisposed).toBeFalse();
    });
});

describe("LazyResolveProvidedForRegisteredServices", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var func;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); })
                 .reusedWithin(TSFunq.ReuseScope.container);

        func = container.lazyResolve(Foo);

        expect(func).not.toBeNull();
    });
});

describe("LazyResolveHonorsReuseScope", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var f1;
        var f2;
        var func;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); })
                 .reusedWithin(TSFunq.ReuseScope.container);

        func = container.lazyResolve(Foo);
        f1 = func();
        f2 = func();

        expect(f1).toBeEqual(f2);
    });
});

describe("LazyResolveNamed", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var bar;
        var container = new TSFunq.Container();

        container.register(Foo, "foo", function (c) { return new Foo("foo"); });
        container.register(Foo, "bar", function (c) { return new Foo("bar"); });
        foo = container.lazyResolveNamed(Foo, "foo");
        bar = container.lazyResolveNamed(Foo, "bar");

        expect(foo).not.toBeNull();
        expect(bar).not.toBeNull();
        expect("foo").toBeEqual(foo.value);
        expect("bar").toBeEqual(bar.value);
    });
});

describe("LazyResolveThrowsIfNotRegistered", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var container = new TSFunq.Container();

        try {
            container.lazyResolve(Foo);
            fail("Should have failed to resolve the lazy func");
        }
        catch (ResolutionException) {
        }
    });
});

describe("LazyResolveNamedThrowsIfNotRegistered", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var container = new TSFunq.Container();

        try {
            container.lazyResolve(Foo, "foo");
            fail("Should have failed to resolve the lazy func");
        }
        catch (ResolutionException) {
        }
    });
});
*/