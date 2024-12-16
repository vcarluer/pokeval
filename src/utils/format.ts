export const formatConfidence = (confidence: number): string => {
  return `${confidence.toFixed(1)}%`;
};

export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} €`;
};