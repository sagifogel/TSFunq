/// <reference path="nameresolver.ts" />

module TSFunq {
    export class RegistrationException implements Error {
        public name: string = "RegistrationException";

        constructor(public message: string) {
        }
    }
}