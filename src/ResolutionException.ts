import {NameResolver} from "./NameResolver";

class ResolutionException implements Error {
    public message: string;
    public name: string = "ResolutionException";

    constructor(ctor: Function, missingServiceName?: string) {
        var buffer: Array<string> = [`Required dependency of type ${NameResolver.resolve(ctor)}`];

        if (missingServiceName) {
            buffer.push(` named ${missingServiceName}`);
        }

        buffer.push(" could not be resolved.");
        this.message = buffer.join("");
    }
}

export {ResolutionException}
