
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
    this.View = view;
}

Presenter.prototype.view = null;

function View() { }

View.prototype.Presenter = null;