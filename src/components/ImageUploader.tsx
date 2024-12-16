import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Sparkle } from './common/Sparkle';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  isLoading
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    disabled: isLoading,
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'manga-container p-8 text-center cursor-pointer transition-all relative',
        {
          'bg-blue-50': isDragActive,
          'opacity-50 cursor-not-allowed': isLoading
        }
      )}
    >
      <input {...getInputProps()} />
      <div className="relative inline-block">
        <PhotoIcon className="mx-auto h-16 w-16 text-red-500" />
        <Sparkle size="sm" position="top-right" />
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-gray-800 font-medium">
          {isDragActive
            ? 'Déposez l\'image ici...'
            : 'Prenez une photo ou glissez-déposez une image de carte Pokémon ici'}
        </p>
        <p className="text-sm text-gray-600">
          ou cliquez pour sélectionner
        </p>
      </div>
      <img 
        src="/images/pokeball-sketch.png"
        alt=""
        className="absolute bottom-2 right-2 w-12 h-12 opacity-20"
      />
    </div>
  );
};