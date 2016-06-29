class UserNotFoundError {
    constructor(message) {
        this.name = 'UserNotFoundError';
        this.message = message;
    }
}
UserNotFoundError.prototype = Object.create(Error.prototype);

module.exports = UserNotFoundError;
