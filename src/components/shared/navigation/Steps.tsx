import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
  className?: string;
}

export function Steps({ steps, currentStep, completedSteps, className = '' }: StepsProps) {
  return (
    <nav className={`space-y-4 ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = currentStep === step.id;

        return (
          <div key={step.id} className="relative">
            {index !== 0 && (
              <div
                className={`absolute left-4 top-0 -ml-px mt-0.5 h-full w-0.5 
                  ${isCompleted ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                aria-hidden="true"
              />
            )}
            <div className="group relative flex items-start">
              <span className="flex h-9 items-center">
                <span
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full
                    ${isCompleted
                      ? 'bg-blue-500'
                      : isCurrent
                        ? 'border-2 border-blue-500 bg-white dark:bg-gray-800'
                        : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                    }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className={`h-2.5 w-2.5 rounded-full ${
                      isCurrent ? 'bg-blue-500' : 'bg-transparent'
                    }`} />
                  )}
                </span>
              </span>
              <div className="ml-4 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {step.label}
                </div>
                {step.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}