function Foo(value, c) { this.value = value; this.count = c; }

function Bar(arg1, arg2, arg3, arg4, arg5, arg6) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    this.arg4 = arg4;
    this.arg5 = arg5;
    this.arg6 = arg6;
}

function Base() {
    this.isDisposed = false;
}

Base.prototype = {
    isDisposed : null,
    dispose: function () {
        this.isDisposed = true;
    }
};

function Disposable() { }
Disposable.prototype = new Base();

function Initializable() {
    this.initializeCalls = 0;
}

Initializable.prototype = {
    initializeCalls: null,
    initialize: function () {
        this.initializeCalls++;
    }
};

function Presenter(view) {
    this.view = view;
}

Presenter.prototype.view = null;

function View() { }

View.prototype.Presenter = null;

module.exports = {
    Foo: Foo,
    Bar: Bar,
    View: View,
    Base: Base,
    Presenter: Presenter,
    Disposable: Disposable,
    Initializable: Initializable
};