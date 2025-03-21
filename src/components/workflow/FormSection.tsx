
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui-custom/Card';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
  icon
}) => {
  return (
    <Card 
      variant="glass" 
      className={cn("w-full animate-slide-up", className)}
    >
      <CardHeader className="flex flex-row items-center space-y-0 gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default FormSection;
