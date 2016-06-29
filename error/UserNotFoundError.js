// function UserNotFoundError(message) {
//     this.message = message;
//     this.name = "MyCustomError";
//     Error.captureStackTrace(this, UserNotFoundError);
// }
// UserNotFoundError.prototype = Object.create(Error.prototype);
// UserNotFoundError.prototype.constructor = UserNotFoundError;
//
// module.exports = UserNotFoundError;



class UserNotFoundError {
    constructor(message) {
        this.name = 'UserNotFoundError';
        this.message = message;
        // this.stack = new Error().stack;
    }
}
UserNotFoundError.prototype = Object.create(Error.prototype);

module.exports = UserNotFoundError;
