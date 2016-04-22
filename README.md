# TSFunq

<a href="https://funq.codeplex.com/" target="_blank">Funq</a> Dependency injection container port for TypeScript

### Installation

You can get the latest release and the type definitions using npm:
```ts
npm install tsfunq --save
```
### Create Dependencies
```ts
interface IDeveloper {
    code(): string;
}

class TypeScriptDeveloper implements IDeveloper {
    public code(): string {
        return "TypeScript";
    }
}

class Person {
    constructor(private developerRole: IDeveloper) {
    }
}
```
### Create the container and register a dependency
```ts
import * as TSFunq from "TSFunq";

let container = new TSFunq.Container(); 	

container.register(TypeScriptDeveloper, c => new TypeScriptDeveloper());
```

### Resolve a dependency
```ts
let resolved = container.resolve(TypeScriptDeveloper);
```

### Register and resolve a dependency using a key
```ts
let developer : IDeveloper;
let container = new TSFunq.Container(); 	

container.register("TypeScriptDeveloper", c => new TypeScriptDeveloper());
developer = container.resolve("TypeScriptDeveloper");
```

### Register and resolve a complex dependency
```ts
container.register(Person, c => {
    let developer = c.resolve(TypeScriptDeveloper);
    return new Person(developer);
});

let person = container.resolve(Person);
```
### Register an instance
```ts
let resolved : IDeveloper;
let developerInstance = new TypeScriptDeveloper();

container.registerInstance(developerInstance);
resolved = container.resolve(TypeScriptDeveloper);
```

### Register and resolve a named dependency
```ts
let developer : IDeveloper;

container.registerNamed(TypeScriptDeveloper, "foo", c => new TypeScriptDeveloper());
developer  = container.resolveNamed(TypeScriptDeveloper, "foo");
developer !== container.resolve(TypeScriptDeveloper); /// true
```

### Try to resolve a dependency
The container will throw an exception if it will not be able to resolve a dependency.<br/>
You can use the ```tryResolve``` or ```tryResolvedNamed``` functions in order to avoid an exception:
```ts
let container = new TSFunq.Container();
let developer = container.tryResolve(TypeScriptDeveloper);

if (developer) {
...
}

let namedDeveloper = container.tryResolveNamed(TypeScriptDeveloper, "foo");

if (namedDeveloper) {
...
}
```
### Register and resolve a named dependency with arguments
You can register a dependency that accepts 1 to 4 parameters
```ts
class OneArgumentClass {
    constructor(private arg1: string) {
    }
}

class TwoArgumentsClass {
    constructor(private arg1: string, private arg2: number) {
    }
}

class ThreeArgumentsClass {
    constructor(private arg1: string, private arg2: number, private arg3: Date) {
    }
}

class FourArgumentsClass {
    constructor(private arg1: string, private arg2: number, private arg3: Date, private arg4: any) {
    }
}

let container = new TSFunq.Container();

container.register<OneArgumentClass, string>(OneArgumentClass, (c, arg1) => new OneArgumentClass(arg1));
container.register<TwoArgumentsClass, string, number>(TwoArgumentsClass, (c, arg1, arg2) => new TwoArgumentsClass(arg1, arg2));
container.register<ThreeArgumentsClass, string, number, Date>(ThreeArgumentsClass, (c, arg1, arg2, arg3) => new ThreeArgumentsClass(arg1, arg2, arg3));
container.register<FourArgumentsClass, string, number, Date, any>(FourArgumentsClass, (c, arg1, arg2, arg3, arg4) => new FourArgumentsClass(arg1, arg2, arg3, arg4));
```
And resolve the dependencies using the appropriate arguments
```ts
container.resolve<OneArgumentClass, string>(OneArgumentClass, "value");
container.resolve<TwoArgumentsClass, string, number>(TwoArgumentsClass, "value", 10);
container.resolve<ThreeArgumentsClass, string, number, Date>(ThreeArgumentsClass, "value", 10, new Date());
container.resolve<FourArgumentsClass, string, number, Date, any>(FourArgumentsClass, "value", 10, new Date(), {});
```

### Creating child containers
By default all child containers can resolve dependencies within themselves and their parent.
```ts
let resolved: TypeScriptDeveloper;
let container = new TSFunq.Container();
let child = container.createChildContainer();

container.register(TypeScriptDeveloper, c => new TypeScriptDeveloper());
resolved = child.resolve(TypeScriptDeveloper);

container.resolve(TypeScriptDeveloper); // Will raise an exception
```

### Controlling the lifetime of an instance
The lifetime of an instance can be a singleton or per call (transient)
You can control the lifetime using the ```TSFunq.ReuseScope``` enum.<br/> 

```ts
enum ReuseScope {
    container = 0,
    hierarchy = 1,
    none = 2
}
```
By default all registrations are marked using  the ```TSFunq.ReuseScope.container``` scope.

```ts
// transient
container.register(TypeScriptDeveloper, c => new TypeScriptDeveloper()).reusedWithin(TSFunq.ReuseScope.none); 

// singleton 
container.register(TypeScriptDeveloper, c => new TypeScriptDeveloper()).reusedWithin(TSFunq.ReuseScope.hierarchy); 

// singleton per container
container.register(TypeScriptDeveloper, c => new TypeScriptDeveloper()).reusedWithin(TSFunq.ReuseScope.container); 
```

### Disposing registered instances
You can let the container to handle disposal of instances using the ```TSFunq.Owner``` enum.<br/>
You need to register a dependency using call .
```ts
enum ReuseScope {
    container = 0,
    external = 1 
}
```
Only instances with ```dispose``` function can be managed within the container.
By default all registrations are marked using  the ```TSFunq.Owner.container``` scope.

```ts
class Disposable implements TSFunq.IDisposable {
    public dispose(): void {
    }
}

let container = new TSFunq.Container();

// The container is responsible of disposing the instance
container.register(TypeScriptDeveloper, c => new TypeScriptDeveloper()).ownedBy(TSFunq.Owner.container); 

  // The container is not responsible of disposing the instance 
container.register(TypeScriptDeveloper, c => new TypeScriptDeveloper()).ownedBy(TSFunq.Owner.external); 
```

### Lazy resolution
You can use the ```lazyResolve``` or ```lazyResolveNamed``` functions in order to resolve a facotry instead of an instance:

```ts
let instance : IDeveloper;
let factory : () => IDeveloper;
let container = new TSFunq.Container();

container.register(TypeScriptDeveloper, c => new TypeScriptDeveloper());
factory = container.lazyResolve(TypeScriptDeveloper, c => new TypeScriptDeveloper());
instance = factory();

container.registerNamed(TypeScriptDeveloper, "foo", c => new TypeScriptDeveloper());
factory = container.lazyResolveNamed(TypeScriptDeveloper, "foo", c => new TypeScriptDeveloper());
instance = factory();
```

### Resolving circular dependencies

You can use the ```initializedBy``` method which run after the resolution phase.
```ts

class Presenter {
    public view: View;

    constructor(view) {
        this.view = view;
    }
}

class View {
    public presenter: Presenter;
}

let view: View;
let presenter: Presenter;
let container = new TSFunq.Container();

container.register(Presenter, c => new Presenter(c.resolve(View)));
container.register(View, c => new View())
         .initializedBy((c, v)  => v.presenter = c.resolve(Presenter));

view = container.resolve(View);
presenter = container.resolve(Presenter);
```

### Changing the default ReuseScope/Owner

```ts
let container = new TSFunq.Container();

container.defaultOwner = TSFunq.Owner.external;
container.defaultReuse = TSFunq.ReuseScope.none;
```

### License

Like Funq itself, this code is licensed under the [Microsoft Public License (Ms-PL)](https://funq.codeplex.com/license)
<br/>
<br/>
Copyright © 2015 Sagi Fogel