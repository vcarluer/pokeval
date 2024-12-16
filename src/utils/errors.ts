export class ImageAnalysisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageAnalysisError';
  }
}

export class CardIdentificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CardIdentificationError';
  }
}

export class PriceRetrievalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PriceRetrievalError';
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}