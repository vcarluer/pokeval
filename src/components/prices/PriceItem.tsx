import React from 'react';

interface PriceItemProps {
  label: string;
  value: string;
}

export const PriceItem: React.FC<PriceItemProps> = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-lg font-medium text-green-600">{value}</p>
  </div>
);