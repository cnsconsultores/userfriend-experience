
import React from 'react';
import { Check, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  id: string;
  title: string;
  description?: string;
}

interface WorkflowStepProps {
  steps: Step[];
  currentStepId: string;
  className?: string;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({ 
  steps,
  currentStepId,
  className
}) => {
  // Find the index of the current step
  const currentIndex = steps.findIndex(step => step.id === currentStepId);
  
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="flex items-center min-w-max">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                    isCompleted ? "bg-primary text-primary-foreground" : 
                    isCurrent ? "bg-primary/20 text-primary border-2 border-primary" : 
                    "bg-secondary text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check size={16} />
                  ) : isCurrent ? (
                    <CircleDot size={16} />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                
                {/* Step title */}
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-xs font-medium",
                    isCurrent ? "text-foreground" :
                    isCompleted ? "text-foreground" : 
                    "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "h-[2px] w-16 mx-1",
                    index < currentIndex ? "bg-primary" : "bg-secondary"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowStep;
