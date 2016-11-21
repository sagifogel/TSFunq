var TSFunq = require("../../../dist/TSFunq");
var Subjects = require("../../../tests/jasmine/subjects");

describe("TSFunq", function () {
    it("should be defined", function () {
        var container = new TSFunq.Container();
        
        expect(container).toBeTruthy();
    });
});

describe("ShouldRegister", function () {
    it("should register a factory and should resolve an instance of the registered type", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); });
        foo = container.resolve(Subjects.Foo);
        
        expect(foo).not.toBeNull();
    });
});

describe("RegisteredInstanceIsResolved", function () {
    it("should register a an instance and resolved the same insatnce as the registered one", function () {
        var f2;
        var f1 = new Subjects.Foo();
        var container = new TSFunq.Container();
        
        container.registerInstance(f1);
        f2 = container.resolve(Subjects.Foo);
        
        expect(f1).toBe(f2);
    });
});

describe("ThrowsIfCannotResolve", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();
        
        try {
            foo = container.resolve(Subjects.Foo);
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
            foo = container.resolveNamed(Subjects.Foo, "foo");
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
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); });
        foo = container.resolve(Subjects.Foo);
        
        expect(foo).not.toBeNull();
        expect(foo.constructor).toEqual(Subjects.Foo);
    });
});

describe("RegistersNamedInstances", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();
        
        try {
            foo = container.resolveNamed(Subjects.Foo, "foo");
            fail("Should have thrown ResolutionException");
        }
        catch (re) {
            expect(re.message.indexOf("foo")).not.toEqual(-1);
        }
    });
});

describe("RegistersWithCtorArguments", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Foo, function (c, s) { return new Subjects.Foo(s); });
        foo = container.resolve(Subjects.Foo, "value");
        
        expect(foo.value).toEqual("value");
    });
});

describe("RegistersWithCtorOverloads", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var foo;
        var foo2;
        var container = new TSFunq.Container();
        
        container.register("Foo1", function (c, s) { return new Subjects.Foo(s); });
        container.register("Foo2", function (c, s, i) { return new Subjects.Foo(s, i); });
        
        foo = container.resolve("Foo1", "value");
        foo2 = container.resolve("Foo2", "foo", 25);
        
        expect(foo.value).toEqual("value");
        expect(foo2.value).toEqual("foo");
        expect(foo2.count).toEqual(25);
    });
});

describe("RegistersAllOverloads", function () {
    it("should throw a ResolutionException when type is not registered", function () {
        var b;
        var container = new TSFunq.Container();
        
        container.registerNamed(Subjects.Bar, "Bar", function (c) { return new Subjects.Bar(); });
        container.registerNamed(Subjects.Bar, "Bar1", function (c, s1) { return new Subjects.Bar(s1); });
        container.registerNamed(Subjects.Bar, "Bar2", function (c, s1, s2) { return new Subjects.Bar(s1, s2); });
        container.registerNamed(Subjects.Bar, "Bar3", function (c, s1, s2, s3) { return new Subjects.Bar(s1, s2, s3); });
        container.registerNamed(Subjects.Bar, "Bar4", function (c, s1, s2, s3, s4) { return new Subjects.Bar(s1, s2, s3, s4); });
        container.registerNamed(Subjects.Bar, "Bar5", function (c, s1, s2, s3, s4, s5) { return new Subjects.Bar(s1, s2, s3, s4, s5); });
        container.registerNamed(Subjects.Bar, "Bar6", function (c, s1, s2, s3, s4, s5, s6) { return new Subjects.Bar(s1, s2, s3, s4, s5, s6); });
        container.registerNamed(Subjects.Bar, "Bar10", function (c, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) { return new Subjects.Bar(a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10); });
        
        expect(container.resolveNamed(Subjects.Bar, "Bar")).toBeTruthy();
        
        b = container.resolveNamed(Subjects.Bar, "Bar1", "a1");
        expect(b.arg1).toEqual("a1");
        
        b = container.resolveNamed(Subjects.Bar, "Bar2", "a1", "a2");
        expect(b.arg1).toEqual("a1");
        expect(b.arg2).toEqual("a2");
        
        b = container.resolveNamed(Subjects.Bar, "Bar3", "a1", "a2", "a3");
        expect(b.arg1).toEqual("a1");
        expect(b.arg2).toEqual("a2");
        expect(b.arg3).toEqual("a3");
        
        b = container.resolveNamed(Subjects.Bar, "Bar4", "a1", "a2", "a3", "a4");
        expect(b.arg1).toEqual("a1");
        expect(b.arg2).toEqual("a2");
        expect(b.arg3).toEqual("a3");
        expect(b.arg4).toEqual("a4");
        
        b = container.resolveNamed(Subjects.Bar, "Bar5", "a1", "a2", "a3", "a4", "a5");
        expect(b.arg1).toEqual("a1");
        expect(b.arg2).toEqual("a2");
        expect(b.arg3).toEqual("a3");
        expect(b.arg4).toEqual("a4");
        expect(b.arg5).toEqual("a5");
        
        b = container.resolveNamed(Subjects.Bar, "Bar6", "a1", "a2", "a3", "a4", "a5", "a6");
        expect(b.arg1).toEqual("a1");
        expect(b.arg2).toEqual("a2");
        expect(b.arg3).toEqual("a3");
        expect(b.arg4).toEqual("a4");
        expect(b.arg5).toEqual("a5");
        expect(b.arg6).toEqual("a6");
        
        b = container.resolveNamed(Subjects.Bar, "Bar10", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        expect(b.arg1).toEqual(10);
    });
});

describe("RegistersNamedFactories", function () {
    it("should regiter two named factories for the same type and resolve two different instances", function () {
        var foo;
        var foo2;
        var container = new TSFunq.Container();
        
        container.registerNamed(Subjects.Foo, "foo", function (c) { return new Subjects.Foo(); });
        container.registerNamed(Subjects.Foo, "foo2", function (c) { return new Subjects.Foo(); });
        foo = container.resolveNamed(Subjects.Foo, "foo");
        foo2 = container.resolveNamed(Subjects.Foo, "foo2");
        
        expect(foo).not.toBe(foo2);
        expect(foo.constructor).toEqual(Subjects.Foo);
        expect(foo2.constructor).toEqual(Subjects.Foo);
    });
});

describe("RegisterOrderForNamedDoesNotMatter", function () {
    it("should register two factories for the same type, which one of them is named factory and should resolve eachone using its factory", function () {
        var foo;
        var foo2;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); });
        container.registerNamed(Subjects.Foo, "foo", function (c) { return new Subjects.Foo("foo"); });
        foo = container.resolve(Subjects.Foo);
        foo2 = container.resolveNamed(Subjects.Foo, "foo");
        
        expect(foo).not.toBeNull();
        expect(foo2).not.toBeNull();
        expect(foo2.value).toEqual("foo");
    });
});

describe("TryResolveReturnsNullIfNotRegistered", function () {
    it("should return null and not throw a ResolutionException when type is not registered", function () {
        var container = new TSFunq.Container();
        
        expect(container.tryResolve(Subjects.Foo)).toBeNull();
        expect(container.tryResolve(Subjects.Foo, "a1")).toBeNull();
        expect(container.tryResolve(Subjects.Foo, "a1", "a2")).toBeNull();
        expect(container.tryResolve(Subjects.Foo, "a1", "a2", "a3")).toBeNull();
        expect(container.tryResolve(Subjects.Foo, "a1", "a2", "a3", "a4")).toBeNull();
        expect(container.tryResolve(Subjects.Foo, "a1", "a2", "a3", "a4", "a5")).toBeNull();
        expect(container.tryResolve(Subjects.Foo, "a1", "a2", "a3", "a4", "a5", "a6")).toBeNull();
    });
});

describe("TryResolveNamedReturnsNullIfNotRegistered", function () {
    it("should return null and not throw a ResolutionException when type is not registered", function () {
        var container = new TSFunq.Container();
        
        expect(container.tryResolveNamed(Subjects.Foo, "foo")).toBeNull();
        expect(container.tryResolveNamed(Subjects.Foo, "foo", "a1")).toBeNull();
        expect(container.tryResolveNamed(Subjects.Foo, "foo", "a1", "a2")).toBeNull();
        expect(container.tryResolveNamed(Subjects.Foo, "foo", "a1", "a2", "a3")).toBeNull();
        expect(container.tryResolveNamed(Subjects.Foo, "foo", "a1", "a2", "a3", "a4")).toBeNull();
        expect(container.tryResolveNamed(Subjects.Foo, "foo", "a1", "a2", "a3", "a4", "a5")).toBeNull();
        expect(container.tryResolveNamed(Subjects.Foo, "foo", "a1", "a2", "a3", "a4", "a5", "a6")).toBeNull();
    });
});

describe("TryResolveReturnsRegisteredInstance", function () {
    it("should resolve an instance when using the tryResolve[...] API", function () {
        var bar;
        var container = new TSFunq.Container();
        
        container.registerNamed(Subjects.Bar, "bar", function (c) { return new Subjects.Bar(); });
        bar = container.tryResolveNamed(Subjects.Bar, "bar");
        expect(bar).not.toBeNull();
    });
});

describe("TryResolveReturnsRegisteredInstanceOnParent", function () {
    it("should create container and a child container and to resolve an instance using the child container's tryResolve[...] API", function () {
        var bar;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();
        
        container.registerNamed(Subjects.Bar, "bar", function (c) { return new Subjects.Bar(); });
        bar = child.tryResolveNamed(Subjects.Bar, "bar");
        
        expect(bar).not.toBeNull();
    });
});

describe("LatestRegistrationOverridesPrevious", function () {
    it("should register two factories for the same type, thus overridng the previous one, and resolve an instance using the last factory", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); });
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo("foo"); });
        foo = container.resolve(Subjects.Foo)
        
        expect(foo.value).toEqual("foo");
    });
});

describe("DisposesContainerOwnedInstances", function () {
    it("should register two disposable instances and mark only one of them to be owned by container. calling the dispose on the container will dispose only the marked one", function () {
        var containerOwned;
        var externallyOwned;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); }).ownedBy(TSFunq.Owner.container);
        container.register(Subjects.Base, function (c) { return new Subjects.Disposable(); }).ownedBy(TSFunq.Owner.external);
        containerOwned = container.resolve(Subjects.Disposable);
        externallyOwned = container.resolve(Subjects.Base);
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
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); })
        foo = child.resolve(Subjects.Foo);
        
        expect(foo).not.toBeNull();
    });
});

describe("NoReuseCreatesNewInstancesAlways", function () {
    it("should register a none reused factory and resolve two different instances", function () {
        var foo1;
        var foo2;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); }).reusedWithin(TSFunq.ReuseScope.none);
        foo1 = container.resolve(Subjects.Foo);
        foo2 = container.resolve(Subjects.Foo);
        
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
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); }).reusedWithin(TSFunq.ReuseScope.container);
        foo1 = container.resolve(Subjects.Foo);
        foo2 = container.resolve(Subjects.Foo);
        
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
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); }).reusedWithin(TSFunq.ReuseScope.hierarchy);
        foo1 = container.resolve(Subjects.Foo);
        foo2 = container.resolve(Subjects.Foo);
        
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
        
        parent.register(Subjects.Foo, function (c) { return new Subjects.Foo(); }).reusedWithin(TSFunq.ReuseScope.hierarchy);
        foo1 = parent.resolve(Subjects.Foo);
        foo2 = child.resolve(Subjects.Foo);
        
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
        
        parent.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); }).reusedWithin(TSFunq.ReuseScope.hierarchy);
        childFoo = child.resolve(Subjects.Disposable);
        parentFoo = parent.resolve(Subjects.Disposable);
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
        
        parent.register(Subjects.Foo, function (c) { return new Subjects.Foo(); }).reusedWithin(TSFunq.ReuseScope.container);
        foo1 = parent.resolve(Subjects.Foo);
        foo2 = child.resolve(Subjects.Foo);
        
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
        
        parent.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); }).reusedWithin(TSFunq.Owner.hierarchy);
        parent.register(Subjects.Base, function (c) { return new Subjects.Disposable(); }).reusedWithin(TSFunq.Owner.container);
        parentFoo = parent.resolve(Subjects.Disposable);
        childFoo = child.resolve(Subjects.Base);
        parent.dispose();
        
        expect(parentFoo.isDisposed).toBeTruthy();
        expect(childFoo.isDisposed).toBeTruthy();
    });
});

describe("ContainerOwnedNonReuseInstacesAreDisposed", function () {
    it("should register a factory of a disposable type which is not reused and owned by container, resolve an instance  and call the dispose funcion. The resolved type should be disposed", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.none)
                 .ownedBy(TSFunq.Owner.container);
        
        foo = container.resolve(Subjects.Disposable);
        container.dispose();
        
        expect(foo.isDisposed).toBeTruthy();
    });
});

describe("ContainerOwnedAndContainerReusedInstacesAreDisposed", function () {
    it("should register a factory of a disposable type which is reused and owned by container, resolve an instance and call the dispose funcion. The resolved type should be disposed", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.container)
                 .ownedBy(TSFunq.Owner.container);
        
        foo = container.resolve(Subjects.Disposable);
        container.dispose();
        
        expect(foo.isDisposed).toBeTruthy();
    });
});

describe("ContainerOwnedAndHierarchyReusedInstacesAreDisposed", function () {
    it("should register a factory of a disposable type which is reused within hierarchy and owned by container, resolve an instance and call the dispose funcion. The resolved type should be disposed", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy)
                 .ownedBy(TSFunq.Owner.container);
        
        foo = container.resolve(Subjects.Disposable);
        container.dispose();
        
        expect(foo.isDisposed).toBeTruthy();
    });
});

describe("ChildContainerInstanceWithParentRegistrationIsDisposed", function () {
    it("should register a factory of a disposable type which is reused within hierarchy and owned by container, create child container, resolve an instance from the child container and call the dispose funcion on of the child container. The resolved type should not be disposed", function () {
        var foo;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();
        
        parent.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); })
              .reusedWithin(TSFunq.ReuseScope.hierarchy)
              .ownedBy(TSFunq.Owner.container);
        
        foo = child.resolve(Subjects.Disposable);
        child.dispose();
        
        expect(foo.isDisposed).toBeFalsy();
    });
});

describe("DisposingParentContainerDisposesChildContainerInstances", function () {
    it("should register a factory of a disposable type which is reused within hierarchy and owned by container, create child container, resolve an instance from the child container and call the dispose funcion on of the child container. The resolved type should not be disposed", function () {
        var foo;
        var parent = new TSFunq.Container();
        var child = parent.createChildContainer();
        
        parent.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); })
              .reusedWithin(TSFunq.ReuseScope.none)
              .ownedBy(TSFunq.Owner.container);
        
        foo = child.resolve(Subjects.Disposable);
        parent.dispose();
        
        expect(foo.isDisposed).toBeTruthy();
    });
});

describe("DisposingContainerDoesNotDisposeExternalOwnedInstances", function () {
    it("should register a factory of a disposable type which is reused within hierarchy and owned externaly, resolve an instance and call the dispose funcion. The resolved type should not be disposed", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy)
                 .ownedBy(TSFunq.Owner.external);
        
        foo = container.resolve(Subjects.Disposable);
        container.dispose();
        
        expect(foo.isDisposed).toBeFalsy();
    });
});

describe("InitializerCalledWhenInstanceCreatedContainerReuse", function () {
    it("should register a factory of a initializable type which is reused within container, call the resolve multiple times and resolve the same instance. The initialization function should be called only once", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Initializable, function (c) { return new Subjects.Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.container);
        
        i1 = container.resolve(Subjects.Initializable);
        i2 = container.resolve(Subjects.Initializable);
        
        expect(i1).toBe(i2);
        expect(1).toEqual(i1.initializeCalls);
    });
});

describe("InitializerCalledWhenInstanceCreatedHierarchyReuse", function () {
    it("should register a factory of a initializable type which is reused within hierarchy, call the resolve multiple times and resolve the same instance. The initialization function should be called only once", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Initializable, function (c) { return new Subjects.Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy);
        
        i1 = container.resolve(Subjects.Initializable);
        i2 = container.resolve(Subjects.Initializable);
        
        expect(i1).toBe(i2);
        expect(1).toEqual(i1.initializeCalls);
    });
});

describe("InitializerCalledWhenInstanceCreatedNoReuse", function () {
    it("should register a factory of a initializable type which is not reused, resolve different instances, but invoke the initialization function only once", function () {
        var i1;
        var i2;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Initializable, function (c) { return new Subjects.Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.none);
        
        i1 = container.resolve(Subjects.Initializable);
        i2 = container.resolve(Subjects.Initializable);
        
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
        
        container.register(Subjects.Initializable, function (c) { return new Subjects.Initializable(); })
                 .initializedBy(function (c, i) { i.initialize(); })
                 .reusedWithin(TSFunq.ReuseScope.container);
        
        i1 = child.resolve(Subjects.Initializable);
        i2 = child.resolve(Subjects.Initializable);
        
        expect(i1).toBe(i2);
        expect(1).toEqual(i1.initializeCalls);
    });
});

describe("InitializerCanRetrieveResolvedDependency", function () {
    it("should register two factories for two types that each one is dependent upon the other. One of the registrations includes an initialization phase. The initialization function should resolve the circular dependency issue", function () {
        var view;
        var presenter;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Presenter, function (c) { return new Subjects.Presenter(c.resolve(Subjects.View)); })
        container.register(Subjects.View, function (c) { return new Subjects.View(); })
                 .initializedBy(function (c, v) { v.presenter = c.resolve(Subjects.Presenter); });
        
        view = container.resolve(Subjects.View);
        presenter = container.resolve(Subjects.Presenter);
        
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
        
        container.register(Subjects.View, function (c) { return new Subjects.View(); })
                 .initializedBy(function (c, v) { v.presenter = c.resolve(Subjects.Presenter); })
                 .reusedWithin(TSFunq.ReuseScope.hierarchy);
        
        child.register(Subjects.Presenter, function (c) { return new Subjects.Presenter(c.resolve(Subjects.View)); });
        
        try {
            view = child.resolve(Subjects.View);
            fail("Should have thrown as presenter is registered on child and initializer runs on parent");
        }
        catch (ResolutionException) {
        }
    });
});

describe("ThrowsIfRegisterContainerService", function () {
    it("should not register a container factory/instance and throw a RegistrationException", function () {
        var view;
        var container = new TSFunq.Container();
        
        try {
            container.register(TSFunq.Container, function (c) { return new TSFunq.Container() });
            fail("Should have thrown when registering a Container service.");
        }
        catch (ArgumentException) {
        }
    });
});

describe("ShouldGetContainerServiceAlways", function () {
    it("should resolve a container without a registration", function () {
        var view;
        var container = new TSFunq.Container();
        var service = container.resolve(TSFunq.Container);
        
        expect(service).not.toBeNull();
    });
});

describe("ShouldGetSameContainerServiceAsCurrentContainer", function () {
    it("should resolve the a different instance of container for each new container", function () {
        var view;
        var service;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();
        var grandChild = child.createChildContainer();
        
        service = container.resolve(TSFunq.Container);
        expect(container).toBe(service);
        
        service = child.resolve(TSFunq.Container);
        expect(child).toBe(service);
        
        service = grandChild.resolve(TSFunq.Container);
        expect(grandChild).toBe(service);
    });
});

describe("DefaultReuseCanBeSpecified", function () {
    it("should resolve different instances of a type after setting the defaultReuse to 'none'", function () {
        var f1;
        var f2
        var container = new TSFunq.Container();
        
        container.defaultReuse = TSFunq.ReuseScope.none;
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); });
        f1 = container.resolve(Subjects.Foo);
        f2 = container.resolve(Subjects.Foo);
        
        expect(f1).not.toBe(f2);
    });
});

describe("DefaultOwnerCanBeSpecified", function () {
    it("should register a disposable type factory, set the defaultOwner to external, call the dispose function and the resolved instance should not be not be disposed", function () {
        var d;
        var container = new TSFunq.Container();
        
        container.defaultOwner = TSFunq.Owner.external;
        container.register(Subjects.Disposable, function (c) { return new Subjects.Disposable(); });
        d = container.resolve(Subjects.Disposable);
        container.dispose();
        
        expect(d.isDisposed).toBeFalsy();
    });
});

describe("LazyResolveProvidedForRegisteredServices", function () {
    it("should register a factory that is reused by container and should be able to resolve a factory (lazy resolve)", function () {
        var func;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); })
                 .reusedWithin(TSFunq.ReuseScope.container);
        
        func = container.lazyResolve(Subjects.Foo);
        
        expect(func).not.toBeNull();
    });
});

describe("LazyResolveHonorsReuseScope", function () {
    it("should register a factory that is reused by container, resolve a factory using lazResolve and call this factory multiple times and resolve the same instance", function () {
        var f1;
        var f2;
        var func;
        var container = new TSFunq.Container();
        
        container.register(Subjects.Foo, function (c) { return new Subjects.Foo(); })
                 .reusedWithin(TSFunq.ReuseScope.container);
        
        func = container.lazyResolve(Subjects.Foo);
        f1 = func();
        f2 = func();
        
        expect(f1).toBe(f2);
    });
});

describe("LazyResolveNamed", function () {
    it("should register two named factories, resolve two different facotries using lazyResolve, and call each facotry and resolve the expected instance", function () {
        var foo;
        var bar;
        var container = new TSFunq.Container();
        
        container.registerNamed(Subjects.Foo, "foo", function (c) { return new Subjects.Foo("foo"); });
        container.registerNamed(Subjects.Foo, "bar", function (c) { return new Subjects.Foo("bar"); });
        foo = container.lazyResolveNamed(Subjects.Foo, "foo");
        bar = container.lazyResolveNamed(Subjects.Foo, "bar");
        
        expect(foo).not.toBeNull();
        expect(bar).not.toBeNull();
        expect("foo").toEqual(foo().value);
        expect("bar").toEqual(bar().value);
    });
});

describe("LazyResolveThrowsIfNotRegistered", function () {
    it("should throw a ResolutionException when type is not registered and resolved through lazyResolve", function () {
        var container = new TSFunq.Container();
        
        try {
            container.lazyResolve(Subjects.Foo);
            fail("Should have failed to resolve the lazy func");
        }
        catch (ResolutionException) {
        }
    });
});

describe("LazyResolveNamedThrowsIfNotRegistered", function () {
    it("should throw a ResolutionException when type is not registered and resolved through lazyResolveNamed", function () {
        var container = new TSFunq.Container();
        
        try {
            container.lazyResolve(Subjects.Foo, "foo");
            fail("Should have failed to resolve the lazy func");
        }
        catch (ResolutionException) {
        }
    });
});

describe("ShouldRegisterUsingTypedString", function () {
    it("should register a factory and should resolve an instance of the registered type using a typed string", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.register("Subjects.Foo", function (c) { return new Subjects.Foo(); });
        foo = container.resolve("Subjects.Foo");
        
        expect(foo).not.toBeNull();
    });
});

describe("ShouldRegisterNamedUsingTypedString", function () {
    it("should register a factory and should resolve an instance of the registered type using a typed string", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.registerNamed("Subjects.Foo", "Subjects.Foo", function (c) { return new Subjects.Foo(); });
        foo = container.resolveNamed("Subjects.Foo", "Subjects.Foo");
        
        expect(foo).not.toBeNull();
    });
});

describe("ThrowsIfCannotResolveUsingTypedString", function () {
    it("should throw a ResolutionException when type is not registered using the correct typed string", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.register("Subjects.Foo", function (c) { return new Subjects.Foo(); });
        
        try {
            foo = container.resolve("Subjects.Foo2");
            fail("Should have thrown ResolutionException");
        }
        catch (re) {
            expect(re.message.indexOf("Foo")).not.toEqual(-1);
        }
    });
});

describe("ThrowsIfCannotResolveNamedUsingTypedString", function () {
    it("should throw a ResolutionException when type is not registered using the correct string", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.registerNamed("Subjects.Foo", "Subjects.Foo", function (c) { return new Subjects.Foo(); });
        
        try {
            foo = container.resolveNamed("Subjects.Foo2", "Subjects.Foo");
            fail("Should have thrown ResolutionException");
        }
        catch (re) {
            expect(re.message.indexOf("Foo")).not.toEqual(-1);
        }
    });
});

describe("ThrowsIfCannotResolveNamedUsingSameTypedStringButDifferentName", function () {
    it("should throw a ResolutionException when type is not registered using the correct string", function () {
        var foo;
        var container = new TSFunq.Container();
        
        container.registerNamed("Subjects.Foo", "Subjects.Foo", function (c) { return new Subjects.Foo(); });
        
        try {
            foo = container.resolveNamed("Subjects.Foo", "Subjects.Foo2");
            fail("Should have thrown ResolutionException");
        }
        catch (re) {
            expect(re.message.indexOf("Foo")).not.toEqual(-1);
        }
    });
});

describe("ChildContainerCanReuseRegistrationsOnParentUsingTypedStringAsKey", function () {
    it("should register a factory using a typed string on a container, create a child container and resolve an instance using the typed key and the child container", function () {
        var foo;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();
        
        container.register("Subjects.Foo", function (c) { return new Subjects.Foo(); })
        foo = child.resolve("Subjects.Foo");
        
        expect(foo).not.toBeNull();
    });
});

describe("ParentContainerCanNotResolveRegistrationThatWasDoneByItsChild", function () {
    it("parent container should create a child container, register a factory using its child container, and fail to resolve the instance", function () {
        var foo;
        var container = new TSFunq.Container();
        var child = container.createChildContainer();
        
        child.register(Subjects.Foo, function (c) { return new Subjects.Foo(); })
        foo = container.tryResolve("Subjects.Foo");
        
        expect(foo).toBeNull();
    });
});
