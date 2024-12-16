export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      try {
        const base64 = reader.result?.toString() || '';
        const base64Data = base64.split(',')[1];
        
        if (!base64Data) {
          throw new Error('Format de fichier invalide');
        }
        
        resolve(base64Data);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Erreur lors du traitement de l\'image'));
      }
    };
    
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
    reader.readAsDataURL(file);
  });
};