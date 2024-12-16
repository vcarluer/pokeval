import { useState, useCallback } from 'react';

export const useCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      setError(null);
      return true;
    } catch (err) {
      setError('Impossible d\'accéder à l\'appareil photo');
      return false;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const takePhoto = useCallback(async (): Promise<File | null> => {
    if (!stream) return null;

    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.drawImage(video, 0, 0);
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        resolve(file);
      }, 'image/jpeg', 0.95);
    });
  }, [stream]);

  return {
    stream,
    error,
    startCamera,
    stopCamera,
    takePhoto,
    isAvailable: 'mediaDevices' in navigator
  };
};