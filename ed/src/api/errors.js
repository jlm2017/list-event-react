
export class NetworkError {
  constructor(message) {
    this.name = 'NetworkError';
    this.message = message;
    this.stack = new Error().stack;
  }
}

export class ApiError {
  constructor(message) {
    this.name = 'ApiError';
    this.message = message;
    this.stack = new Error().stack;
  }
}

export class EntityNotFoundError extends ApiError {}

export class BadDataError extends ApiError {}
