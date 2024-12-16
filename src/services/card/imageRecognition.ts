import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { ImageAnalysisError } from '../../utils/errors';
import { tryMultipleProcessings } from '../../utils/imageProcessing';

let model: mobilenet.MobileNet | null = null;

const loadModel = async () => {
  if (!model) {
    model = await mobilenet.load({
      version: 2,
      alpha: 1.0
    });
  }
  return model;
};

const createImageElement = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new ImageAnalysisError('Erreur lors du chargement de l\'image'));
    img.src = src;
  });
};

export interface Prediction {
  className: string;
  probability: number;
}

const analyzeImage = async (imageElement: HTMLImageElement): Promise<Prediction[]> => {
  const model = await loadModel();
  return model.classify(imageElement, {
    topk: 10,
    maxPredictions: 10
  });
};

export const recognizeImage = async (imageFile: File): Promise<Prediction[]> => {
  try {
    // Générer plusieurs versions prétraitées de l'image
    const processedImages = await tryMultipleProcessings(imageFile);
    
    // Analyser chaque version
    const allPredictions = await Promise.all(
      processedImages.map(async (imgSrc) => {
        const img = await createImageElement(imgSrc);
        const predictions = await analyzeImage(img);
        return predictions;
      })
    );

    // Fusionner et agréger les prédictions
    const predictionMap = new Map<string, number>();
    
    allPredictions.flat().forEach(pred => {
      const current = predictionMap.get(pred.className) || 0;
      predictionMap.set(
        pred.className,
        current + pred.probability
      );
    });

    // Normaliser et trier les résultats
    const finalPredictions = Array.from(predictionMap.entries())
      .map(([className, totalProb]) => ({
        className,
        probability: totalProb / processedImages.length
      }))
      .sort((a, b) => b.probability - a.probability)
      .filter(pred => pred.probability > 0.1);

    if (finalPredictions.length === 0) {
      throw new ImageAnalysisError('Aucun élément reconnu dans l\'image');
    }

    return finalPredictions;
  } catch (error) {
    console.error('Erreur lors de la reconnaissance:', error);
    throw new ImageAnalysisError(
      error instanceof Error ? error.message : 'Erreur lors de l\'analyse de l\'image'
    );
  }
};