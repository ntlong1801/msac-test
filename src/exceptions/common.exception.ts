export class HttpException extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export class InvalidDateException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}