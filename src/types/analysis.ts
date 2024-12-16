export interface CardAnalysisResult {
  name?: string;
  englishName?: string;
  subtype?: string;
  hp?: string;
}

export interface OpenAIError {
  response?: {
    status: number;
    data?: {
      error?: {
        message: string;
      };
    };
  };
}