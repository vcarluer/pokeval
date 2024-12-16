import React from 'react';

interface PriceSectionProps {
  title: string;
  children: React.ReactNode;
}

export const PriceSection: React.FC<PriceSectionProps> = ({ title, children }) => (
  <div className="space-y-3">
    <h4 className="font-semibold text-gray-900">{title}</h4>
    {children}
  </div>
);