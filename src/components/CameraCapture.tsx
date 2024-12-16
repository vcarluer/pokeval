import React, { useEffect, useRef } from 'react';
import { XMarkIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useCamera } from '../hooks/useCamera';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  onClose
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { stream, error, startCamera, stopCamera, takePhoto } = useCamera();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleCapture = async () => {
    const file = await takePhoto();
    if (file) {
      onCapture(file);
      onClose();
    }
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
          <p className="text-red-600 text-center mb-4">{error}</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      <div className="relative flex-1">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-black p-4 flex justify-center">
        <button
          onClick={handleCapture}
          className="p-4 bg-white rounded-full hover:bg-gray-200"
        >
          <CameraIcon className="w-8 h-8 text-black" />
        </button>
      </div>
    </div>
  );
};