/// <reference path="ihashable.ts" />

module TSFunq {
    export interface IEquatable<T> extends IHashable {
        equals(other: T): boolean;
    }
}