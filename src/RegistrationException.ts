class RegistrationException implements Error {
    public name: string = "RegistrationException";

    constructor(public message: string) {
    }
}

export {RegistrationException}