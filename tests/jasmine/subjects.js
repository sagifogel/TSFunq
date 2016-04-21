function Foo(value) { this.value = value; }

function Bar() { }

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