
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'neo' | 'paper';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className,
  variant = 'default'
}) => {
  const variantClassNames = {
    default: "bg-card",
    glass: "glass-morphism",
    neo: "neo-morphism",
    paper: "bg-card paper-shadow"
  };
  
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden border border-border/40",
        "transition-all duration-300 p-6",
        variantClassNames[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
);

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3 className={cn("text-lg font-semibold", className)}>
    {children}
  </h3>
);

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => (
  <p className={cn("text-sm text-muted-foreground", className)}>
    {children}
  </p>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={cn("", className)}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={cn("mt-4 pt-4 border-t border-border/40 flex items-center", className)}>
    {children}
  </div>
);

// Export all components
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
