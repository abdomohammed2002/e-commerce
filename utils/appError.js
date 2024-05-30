class AppError extends Error {
  constructor(statusCode, statusText, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.isOperational = true;
  }
}

module.exports = AppError;
