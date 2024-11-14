import React, { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ children }) => (
  <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
    {children}
  </div>
);

export const AlertTitle: React.FC<AlertProps> = ({ children }) => (
  <span className="font-bold">{children}</span>
);

export const AlertDescription: React.FC<AlertProps> = ({ children }) => (
  <span>{children}</span>
);=