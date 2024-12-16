export interface ImageProcessingOptions {
  brightness: number;   // Ajustement de la luminosité (-100 à 100)
  contrast: number;     // Ajustement du contraste (-100 à 100)
  grayscale: boolean;   // Conversion en niveaux de gris
  threshold: number;    // Seuil pour la binarisation (0-255, 0 pour désactiver)
}