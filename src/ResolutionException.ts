/// <reference path="nameresolver.ts" />

module TSFunq {
    export class ResolutionException implements Error {
        public name: string;
        public message: string;

        constructor(ctor: Function, missingServiceName?: string) {
            var buffer: Array<string> = ["Required dependency of type "];

            buffer.push(NameResolver.resolve(ctor));

            if (missingServiceName) {
                buffer.push(" named ");
                buffer.push(missingServiceName);
            }

            buffer.push(" could not be resolved");
            this.message = buffer.join("");
        }
    }
}