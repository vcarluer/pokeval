export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];
        if (!base64Data) {
          reject(new Error('Format de fichier invalide'));
          return;
        }
        resolve(base64Data);
      } catch (error) {
        reject(new Error('Erreur lors du traitement de l\'image'));
      }
    };
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
    reader.readAsDataURL(file);
  });
};