import React from 'react';

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={`container mx-auto px-4 ${className ?? ''}`}>{children}</div>;
