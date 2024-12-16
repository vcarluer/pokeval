import React from 'react';

interface ErrorMessageProps {
  message: string;
  details?: string[];
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, details }) => (
  <div className="manga-container p-4 space-y-4">
    <div className="text-red-600 font-medium text-center">
      {message}
    </div>
    
    {details && details.length > 0 && (
      <div className="mt-2 text-sm text-gray-600 space-y-1">
        {details.map((detail, index) => (
          <p key={index} className="text-center">{detail}</p>
        ))}
      </div>
    )}
  </div>
);