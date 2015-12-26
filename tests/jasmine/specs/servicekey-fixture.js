var TSFunq = require("../../../build/TSFunq");
var Subjects = require("../../../tests/jasmine/subjects");

describe("KeyNotEqualsNull", function () {
    it("should return false when new service key is compared to null", function () {
        var key1 = new TSFunq.ServiceKey(Subjects.Disposable, null);

        expect(key1).not.toBeNull();
        expect(key1.equals(null)).toBeFalsy();
    });
});

describe("KeyNotEqualsOtherType", function () {
    it("should return false when new service key is compared to new object", function () {
        var key1 = new TSFunq.ServiceKey(Subjects.Disposable, null);

        expect(key1).not.toEqual({});
        expect(key1.equals({})).toBeFalsy();
    });
});

describe("KeyEqualsSameReference", function () {
    it("should return true when new service key is compared to itself", function () {
        var key1 = new TSFunq.ServiceKey(Subjects.Disposable, null);
        var key2 = key1;

        expect(key1).toBe(key2);
        expect(key1.equals(key2)).toBeTruthy();
    });
});

describe("KeysAreEqualByType", function () {
    it("should return true when two service keys are created with the same function", function () {
        var key1 = new TSFunq.ServiceKey(Subjects.Disposable, null);
        var key2 = new TSFunq.ServiceKey(Subjects.Disposable, null);

        expect(key1).not.toBe(key2);
        expect(key1.getHashCode()).toEqual(key2.getHashCode());
        expect(key1.equals(key2)).toBeTruthy();
    });
});

describe("KeysAreEqualByTypeAndName", function () {
    it("should return true when two service keys are created with the same function and service name", function () {
        var key1 = new TSFunq.ServiceKey(Subjects.Disposable, "foo");
        var key2 = new TSFunq.ServiceKey(Subjects.Disposable, "foo");

        expect(key1).not.toBe(key2);
        expect(key1.getHashCode()).toEqual(key2.getHashCode());
        expect(key1.equals(key2)).toBeTruthy();
    });
});

describe("KeysAreEqualByTypeAndName", function () {
    it("should return false when two service keys are created with the same function but different service name", function () {
        var key1 = new TSFunq.ServiceKey(Subjects.Disposable, "foo");
        var key2 = new TSFunq.ServiceKey(Subjects.Disposable, "bar");

        expect(key1).not.toBe(key2);
        expect(key1.getHashCode()).not.toEqual(key2.getHashCode());
        expect(key1.equals(key2)).toBeFalsy();
    });
});