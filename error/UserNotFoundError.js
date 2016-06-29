class UserNotFoundError {
    constructor(message) {
        this.name = 'UserNotFoundError';
        this.message = message;
        // this.stack = new Error().stack;
    }
}
UserNotFoundError.prototype = Object.create(Error.prototype);

module.exports = UserNotFoundError;
