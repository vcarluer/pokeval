export class CardmarketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CardmarketError';
  }
}

export class ImageAnalysisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageAnalysisError';
  }
}

export class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenAIError';
  }
}