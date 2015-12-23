var TSFunq;
(function (TSFunq) {
    (function (Owner) {
        Owner[Owner["Container"] = 0] = "Container";
        Owner[Owner["External"] = 1] = "External";
        Owner[Owner["Default"] = 2] = "Default";
    })(TSFunq.Owner || (TSFunq.Owner = {}));
    var Owner = TSFunq.Owner;
})(TSFunq || (TSFunq = {}));
var TSFunq;
(function (TSFunq) {
    (function (ReuseScope) {
        ReuseScope[ReuseScope["Container"] = 0] = "Container";
        ReuseScope[ReuseScope["Hierarchy"] = 1] = "Hierarchy";
        ReuseScope[ReuseScope["None"] = 2] = "None";
        ReuseScope[ReuseScope["Default"] = 1] = "Default";
    })(TSFunq.ReuseScope || (TSFunq.ReuseScope = {}));
    var ReuseScope = TSFunq.ReuseScope;
})(TSFunq || (TSFunq = {}));
var TSFunq;
(function (TSFunq) {
    function resolveByCode(ctor) {
        var match = ctor.toString().match(NameResolver.nameRegex);
        return (match && match.length > 0 && match[1]) || resolveByPrototype(ctor);
    }
    function resolveByPrototype(ctor) {
        var buffer = new Array();
        var prototype = ctor.prototype;
        for (var item in prototype) {
            if (typeof prototype[item] === "function") {
                buffer.push(item);
            }
        }
        return buffer.join("");
    }
    var NameResolver = (function () {
        function NameResolver() {
        }
        NameResolver.resolve = function (ctor) {
            return ctor.name || resolveByCode(ctor);
        };
        NameResolver.nameRegex = /function ([^\(]+)/;
        return NameResolver;
    })();
    TSFunq.NameResolver = NameResolver;
})(TSFunq || (TSFunq = {}));
/// <reference path="nameresolver.ts" />
var TSFunq;
(function (TSFunq) {
    var ResolutionException = (function () {
        function ResolutionException(ctor, missingServiceName) {
            this.name = "ResolutionException";
            var buffer = ["Required dependency of type "];
            buffer.push(TSFunq.NameResolver.resolve(ctor));
            if (missingServiceName) {
                buffer.push(" named ");
                buffer.push(missingServiceName);
            }
            buffer.push(" could not be resolved");
            this.message = buffer.join("");
        }
        return ResolutionException;
    })();
    TSFunq.ResolutionException = ResolutionException;
})(TSFunq || (TSFunq = {}));
/// <reference path="syntax.ts" />
/// <reference path="resolutionexception.ts" />
/// <reference path="reusescope.ts" />
/// <reference path="container.ts" />
var TSFunq;
(function (TSFunq) {
    var ServiceEntry = (function () {
        function ServiceEntry() {
        }
        ServiceEntry.prototype.ownedBy = function (owner) {
            this.owner = owner;
        };
        ServiceEntry.prototype.reusedWithin = function (scope) {
            this.reuse = scope;
            return this;
        };
        return ServiceEntry;
    })();
    TSFunq.ServiceEntry = ServiceEntry;
})(TSFunq || (TSFunq = {}));
/// <reference path="owner.ts" />
/// <reference path="reusescope.ts" />
/// <reference path="serviceenrty.ts" />
/// <reference path="syntax.ts" />
/// <reference path="container.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSFunq;
(function (TSFunq) {
    var GenericServiceEntry = (function (_super) {
        __extends(GenericServiceEntry, _super);
        function GenericServiceEntry(factory) {
            _super.call(this);
            this.factory = factory;
        }
        GenericServiceEntry.prototype.initializeInstance = function (instance) {
            var dynamicInstance = instance;
            if (this.reuse != TSFunq.ReuseScope.None) {
                this.instance = instance;
            }
            if (this.owner == TSFunq.Owner.Container && dynamicInstance.dispose) {
                this.container.trackDisposable(dynamicInstance);
            }
            if (this.initializer) {
                this.initializer(this.container, instance);
            }
        };
        GenericServiceEntry.prototype.initializedBy = function (initializer) {
            this.initializer = initializer;
            return this;
        };
        GenericServiceEntry.prototype.cloneFor = function (newContainer) {
            return GenericServiceEntry.build({
                reuse: this.reuse,
                owner: this.owner,
                factory: this.factory,
                container: newContainer,
                initializer: this.initializer,
            });
        };
        GenericServiceEntry.build = function (bag) {
            var serviceEntry = new GenericServiceEntry(bag.factory);
            serviceEntry.container = bag.container;
            serviceEntry.instance = bag.instance;
            serviceEntry.owner = bag.owner;
            serviceEntry.reuse = bag.reuse;
            return serviceEntry;
        };
        return GenericServiceEntry;
    })(TSFunq.ServiceEntry);
    TSFunq.GenericServiceEntry = GenericServiceEntry;
})(TSFunq || (TSFunq = {}));
var TSFunq;
(function (TSFunq) {
    var Stack = (function () {
        function Stack() {
            this.arr = new Array();
        }
        Object.defineProperty(Stack.prototype, "length", {
            get: function () {
                return this.arr.length;
            },
            enumerable: true,
            configurable: true
        });
        Stack.prototype.clear = function () {
            this.arr.length = 0;
        };
        Stack.prototype.contains = function (item) {
            return this.arr.indexOf(item) > -1;
        };
        Stack.prototype.peek = function () {
            return this.arr[0];
        };
        Stack.prototype.pop = function () {
            return this.arr.shift();
        };
        Stack.prototype.push = function (item) {
            this.arr.push(item);
        };
        return Stack;
    })();
    TSFunq.Stack = Stack;
})(TSFunq || (TSFunq = {}));
/// <reference path="ihashable.ts" />
var TSFunq;
(function (TSFunq) {
    var Dictionary = (function () {
        function Dictionary(init) {
            if (init === void 0) { init = []; }
            for (var i = 0; i < init.length; i++) {
                var item = init[i];
                this[item.key.getHashCode()] = item.value;
            }
        }
        Dictionary.prototype.add = function (key, value) {
            this[key.getHashCode()] = value;
        };
        Dictionary.prototype.remove = function (key) {
            delete this[key.getHashCode()];
        };
        Dictionary.prototype.containsKey = function (key) {
            return !!this[key.getHashCode()];
        };
        Dictionary.prototype.tryGetValue = function (key, entry) {
            var value = this[key.getHashCode()];
            if (value) {
                entry.out = value;
                return true;
            }
            return false;
        };
        return Dictionary;
    })();
    TSFunq.Dictionary = Dictionary;
})(TSFunq || (TSFunq = {}));
/// <reference path="ihashable.ts" />
/// <reference path="iequatable.ts" />
var TSFunq;
(function (TSFunq) {
    var EquatbaleString = (function () {
        function EquatbaleString(value) {
            this.value = value;
        }
        EquatbaleString.prototype.equals = function (other) {
            return this.getHashCode() === other.getHashCode();
        };
        EquatbaleString.prototype.getHashCode = function () {
            var val = this.value, hash = 0, i = 0, len = val.length, chr;
            while (i < len) {
                hash = ((hash << 5) - hash + val.charCodeAt(i++)) << 0;
            }
            return hash;
        };
        return EquatbaleString;
    })();
    TSFunq.EquatbaleString = EquatbaleString;
})(TSFunq || (TSFunq = {}));
/// <reference path="iequatable.ts" />
/// <reference path="nameresolver.ts" />
/// <reference path="equatbalestring.ts" />
var TSFunq;
(function (TSFunq) {
    var ServiceKey = (function () {
        function ServiceKey(ctor, serviceName) {
            this.ctor = ctor;
            this.serviceName = serviceName;
            var name = TSFunq.NameResolver.resolve(ctor);
            var equatbaleString = new TSFunq.EquatbaleString(name);
            this.hash = equatbaleString.getHashCode();
            if (serviceName) {
                var equatbaleServiceName = new TSFunq.EquatbaleString(serviceName);
                this.hash ^= equatbaleServiceName.getHashCode();
            }
        }
        ServiceKey.prototype.equals = function (obj) {
            return obj.getHashCode() === this.getHashCode();
        };
        ServiceKey.prototype.getHashCode = function () {
            return this.hash;
        };
        return ServiceKey;
    })();
    TSFunq.ServiceKey = ServiceKey;
})(TSFunq || (TSFunq = {}));
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
var TSFunq;
(function (TSFunq) {
    var Container = (function () {
        function Container() {
            this.defaultOwner = TSFunq.Owner.Container;
            this.defaultReuse = TSFunq.ReuseScope.Container;
            this.disposables = new TSFunq.Stack();
            this.childContainers = new TSFunq.Stack();
            this.services = new TSFunq.Dictionary();
            var serviceEntry = TSFunq.GenericServiceEntry.build({
                instance: this,
                factory: function (c) { return c; },
                container: this,
                owner: TSFunq.Owner.External,
                reuse: TSFunq.ReuseScope.Container
            });
            this.services.add(new TSFunq.ServiceKey(Container), serviceEntry);
        }
        Container.prototype.createChildContainer = function () {
            var child = new Container();
            child.parent = this;
            this.childContainers.push(child);
            return child;
        };
        Container.prototype.dispose = function () {
            while (this.disposables.length > 0) {
                var disposable = this.disposables.pop();
                disposable.dispose();
            }
            while (this.childContainers.length > 0) {
                this.childContainers.pop().dispose();
            }
        };
        Container.prototype.register = function (ctor, factory) {
            return this.registerNamed(ctor, null, factory);
        };
        Container.prototype.registerNamed = function (ctor, name, factory) {
            return this.registerImpl(ctor, name, factory);
        };
        Container.prototype.registerImpl = function (ctor, name, factory) {
            var key;
            var entry = TSFunq.GenericServiceEntry.build({
                container: this,
                factory: factory,
                reuse: this.defaultReuse,
                owner: this.defaultOwner
            });
            key = new TSFunq.ServiceKey(ctor, name);
            this.services.add(key, entry);
            return entry;
        };
        Container.prototype.resolve = function (ctor) {
            return this.resolveNamed(ctor, null);
        };
        Container.prototype.resolveNamed = function (ctor, name) {
            return this.resolveImpl(ctor, name, true);
        };
        Container.prototype.tryResolve = function (ctor) {
            return this.tryResolveNamed(ctor, null);
        };
        Container.prototype.tryResolveNamed = function (ctor, name) {
            return this.resolveImpl(ctor, name, false);
        };
        Container.prototype.lazyResolve = function (ctor) {
            return this.lazyResolveNamed(ctor, null);
        };
        Container.prototype.lazyResolveNamed = function (ctor, name) {
            var _this = this;
            this.throwIfNotRegistered(ctor, name);
            return function () { return _this.resolveNamed(ctor, name); };
        };
        Container.prototype.resolveImpl = function (ctor, name, throwIfMissing) {
            var instance;
            var entry = this.getEntry(ctor, name, throwIfMissing);
            if (!entry) {
                return null;
            }
            instance = entry.instance;
            if (!instance) {
                instance = entry.factory(entry.container);
                entry.initializeInstance(instance);
            }
            return instance;
        };
        Container.prototype.getEntry = function (ctor, serviceName, throwIfMissing) {
            var container = this;
            var entry;
            var key = new TSFunq.ServiceKey(ctor, serviceName);
            var outResult = {};
            while (!container.services.tryGetValue(key, outResult) && container.parent) {
                container = container.parent;
            }
            entry = outResult.out;
            if (entry) {
                if (entry.reuse == TSFunq.ReuseScope.Container && entry.container != this) {
                    entry = entry.cloneFor(this);
                    this.services.add(key, entry);
                }
            }
            else if (throwIfMissing) {
                Container.throwMissing(ctor, serviceName);
            }
            return entry;
        };
        Container.throwMissing = function (ctor, serviceName) {
            if (!serviceName) {
                throw new TSFunq.ResolutionException(ctor);
            }
            else {
                throw new TSFunq.ResolutionException(ctor, serviceName);
            }
        };
        Container.prototype.throwIfNotRegistered = function (ctor, name) {
            this.getEntry(ctor, name, true);
        };
        Container.prototype.trackDisposable = function (instance) {
            this.disposables.push(instance);
        };
        return Container;
    })();
    TSFunq.Container = Container;
})(TSFunq || (TSFunq = {}));
