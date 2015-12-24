var TSFunq = require("../../../build/TSFunq");
var Subjects = require("../subjects");

describe("ShouldRegister", function () {
    it("should register a factory and should resolve an instance of the registered type", function () {
        var foo;
        var container = new TSFunq.Container();

        container.registerInstance(Foo, function (c) { return new Foo(); });
        foo = container.resolve(Foo);

        expect(foo).not.toBeNull();
    });
});

describe("RegisteredInstanceIsResolved", function () {
    it("should register a registered instance and resolved the same insatnce as the registered one", function () {
        var f2;
        var f1 = new Foo();
        var container = new TSFunq.Container();

        container.register(f1);
        f2 = container.resolve(Foo);

        expect(f1).toEqual(f2);
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
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); });
        foo = container.resolve(Foo);

        expect(foo).not.toBeNull();
        expect(foo.constructor).toEqual(Foo);
    });
});

describe("RegistersNamedInstances", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var foo2;
        var container = new TSFunq.Container();

        container.register(Foo, "foo", function (c) { return new Foo(); });
        container.register(Foo, "foo2", function (c) { return new Foo2(); });
        foo = container.resolveNamed(Foo, "foo");
        foo2 = container.resolveNamed(Foo, "foo2");

        expect(foo).not.toEqual(foo2);
        expect(foo.constructor).toEqual(Foo);
        expect(foo2.constructor).toEqual(Foo);
    });
});

describe("RegisterOrderForNamedDoesNotMatter", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var foo2;
        var container = new TSFunq.Container();

        container.Register(Foo, function (c) { return new Foo(); });
        container.Register(Foo, "foo", function (c) { return new Foo("foo"); });
        foo = container.resolve(Foo);
        foo2 = container.resolveNamed(Foo, "foo");

        expect(foo).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo2.value).toEqual("foo");
    });
});

describe("TryResolveReturnsNullIfNotRegistered", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();

        expect(container.tryResolve(Foo)).toBeNull();
    });
});

describe("TryResolveNamedReturnsNullIfNotRegistered", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var container = new TSFunq.Container();
        var foo = container.tryResolveNamed(Foo, "foo");

        expect(foo).toBeNull();
    });
});

describe("TryResolveReturnsRegisteredInstance", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var bar;
        var container = new TSFunq.Container();

        container.Register(Bar, "bar", function (c) { return new Bar(); });

        expect(container.tryResolveNamed(Bar, "bar")).not.toBeNull();
    });
});

describe("TryResolveReturnsRegisteredInstanceOnParent", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var bar;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();

        container.Register(Bar, "bar", function (c) { return new Bar(); });

        expect(child.tryResolveNamed(Bar, "bar")).not.toBeNull();
    });
});

describe("LatestRegistrationOverridesPrevious", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();

        container.Register(Foo, function (c) { return new Foo(); });
        container.Register(Foo, function (c) { return new Foo("foo"); });
        foo = container.resolve(Foo)

        expect(foo.value).toEqual("foo");
    });
});

describe("DisposesContainerOwnedInstances", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var containerOwned;
        var externallyOwned;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); }).ownedBy(TSFunq.Owner.container);
        container.register(Base, function (c) { return new Disposable(); }).ownedBy(TSFunq.Owner.external);
        containerOwned = container.resolve(Disposable);
        externallyOwned = container.resolve(Base);
        container.dispose();

        expect(containerOwned.isDisposed).toBeTrue();
        expect(externallyOwned.isDisposed).toBeFalse();
    });
});

describe("ChildContainerCanReuseRegistrationsOnParent", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();

        container.register(Foo, function (c) { return new Foo(); })
        foo = child.resolve(Foo);

        expect(foo).not.toBeNull();
    });
});

describe("NoReuseCreatesNewInstancesAlways", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo1;
        var foo2;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); }).reusedWithin(TSFunq.ReuseScope.none);
        foo1 = container.resolve(Foo);
        foo2 = container.resolve(Foo);

        expect(foo1).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo1).not.toEqual(foo2);
    });
});

describe("ContainerScopedInstanceIsReused", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo1;
        var foo2;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); }).reusedWithin(TSFunq.ReuseScope.container);
        foo1 = container.resolve(Foo);
        foo2 = container.resolve(Foo);

        expect(foo1).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo1).toEqual(foo2);
    });
});

describe("HierarchyScopedInstanceIsReusedOnSameContainer", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo1;
        var foo2;
        var container = new TSFunq.Container();

        container.register(Foo, function (c) { return new Foo(); }).reusedWithin(TSFunq.ReuseScope.hierarchy);
        foo1 = container.resolve(Foo);
        foo2 = container.resolve(Foo);

        expect(foo1).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo1).toEqual(foo2);
    });
});

describe("HierarchyScopedInstanceIsReusedFromParentContainer", function () {
    it("should throw a ResolutionException when type is not registered", function () {
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
    it("should throw a ResolutionException when type is not registered", function () {
        var childFoo;
        var parentFoo;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();

        parent.register(Base, function (c) { return new Disposable(); }).reusedWithin(TSFunq.ReuseScope.hierarchy);
        childFoo = child.resolve(Base);
        parentFoo = parent.resolve(Base);
        child.dispose();

        expect(parentFoo).not.toBeNull();
        expect(childFoo).not.toBeNull();
        expect(parentFoo.isDisposed).toBeFalse();
    });
});

describe("ContainerScopedInstanceIsNotReusedFromParentContainer", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo1;
        var foo2;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();

        parent.register(Foo, function (c) { return new Foo(); }).reusedWithin(TSFunq.ReuseScope.container);
        foo1 = parent.resolve(Foo);
        foo2 = child.resolve(Foo);

        expect(foo1).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo1).not.toEqual(foo2);
    });
});

describe("DisposingParentContainerDisposesChildContainerAndInstances", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var childFoo;
        var parentFoo;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();

        container.register(Disposable, function (c) { return new Disposable(); }).reusedWithin(TSFunq.Owner.hierarchy);
        container.register(Base, function (c) { return new Disposable(); }).reusedWithin(TSFunq.Owner.container);
        parentFoo = parent.resolve(Disposable);
        childFoo = child.resolve(Base);

        parent.dispose();

        expect(parentFoo.isDisposed).toBeTrue();
        expect(childFoo.isDisposed).toBeTrue();
    });
});

describe("ContainerOwnedNonReuseInstacesAreDisposed", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.none)
                 .ownedBy(TSFunq.Owner.container);

        foo = container.resolve(Disposable);
        container.dispose();

        expect(foo.isDisposed).toBeTrue();
    });
});

describe("ContainerOwnedAndContainerReusedInstacesAreDisposed", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.container)
                 .ownedBy(TSFunq.Owner.container);

        foo = container.resolve(Disposable);
        container.dispose();

        expect(foo.isDisposed).toBeTrue();
    });
});

describe("ContainerOwnedAndHierarchyReusedInstacesAreDisposed", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy)
                 .ownedBy(TSFunq.Owner.container);

        foo = container.resolve(Disposable);
        container.dispose();

        expect(foo.isDisposed).toBeTrue();
    });
});

describe("ChildContainerInstanceWithParentRegistrationIsDisposed", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var parent = new TSFunq.Container();
        var child = parent.CreateChildContainer();

        parent.register(Disposable, function (c) { return new Disposable(); })
              .reusedWithin(TSFunq.ReuseScope.hierarchy)
              .ownedBy(TSFunq.Owner.container);

        foo = child.resolve(Disposable);
        child.dispose();

        expect(foo.isDisposed).toBeFalse();
    });
});

describe("DisposingParentContainerDisposesChildContainerInstances", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var parent = new TSFunq.Container();
        var child = parent.CreateChildContainer();

        parent.register(Disposable, function (c) { return new Disposable(); })
              .reusedWithin(TSFunq.ReuseScope.none)
              .ownedBy(TSFunq.Owner.container);

        foo = child.resolve(Disposable);
        parent.dispose();

        expect(foo.isDisposed).toBeTrue();
    });
});

describe("DisposingContainerDoesNotDisposeExternalOwnedInstances", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();

        container.register(Disposable, function (c) { return new Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy)
                 .ownedBy(TSFunq.Owner.external);

        foo = container.resolve(Disposable);
        container.dispose();

        expect(foo.isDisposed).toBeFalse();
    });
});

describe("InitializerCalledWhenInstanceCreatedContainerReuse", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();

        container.register(Initializable, function (c) { return new Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.container);

        i1 = container.resolve(Initializable);
        i2 = container.resolve(Initializable);

        expect(i1).toBeEqual(i2);
        expect(1).toBeEqual(i1.initializeCalls);
    });
});

describe("InitializerCalledWhenInstanceCreatedHierarchyReuse", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();

        container.register(Initializable, function (c) { return new Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy);

        i1 = container.resolve(Initializable);
        i2 = container.resolve(Initializable);

        expect(i1).toBeEqual(i2);
        expect(1).toBeEqual(i1.initializeCalls);
    });
});

describe("InitializerCalledWhenInstanceCreatedNoReuse", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();

        container.register(Initializable, function (c) { return new Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.none);

        i1 = container.resolve(Initializable);
        i2 = container.resolve(Initializable);

        expect(i1).not.toBeEqual(i2);
        expect(1).toBeEqual(i1.initializeCalls);
        expect(1).toBeEqual(i2.initializeCalls);
    });
});

describe("InitializerCalledOnChildContainerWhenInstanceCreated", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();

        container.register(Initializable, function (c) { return new Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.container);

        i1 = child.resolve(Initializable);
        i2 = child.resolve(Initializable);

        expect(i1).toBeEqual(i2);
        expect(1).toBeEqual(i1.initializeCalls);
    });
});

describe("InitializerCanRetrieveResolvedDependency", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var view;
        var presenter;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();

        container.register(Presenter, function (c) { return new Presenter(c.resolve(View)); })
        container.register(View, function (c) { return new View(); })
                 .initializedBy(function (c, v) { v.presenter = c.resolve(Presenter); });

        view = container.resolve(View);
        presenter = container.resolve(Presenter);

        expect(view.presenter).toBeEqual(presenter);
    });
});

describe("InitializerCalledOnEntryContainer", function () {
    it("should throw a ResolutionException when type is not registered", function () {
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