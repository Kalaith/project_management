import React from 'react';

export interface ProgressStep {
  number: number;
  label: string;
}

interface ProgressBarProps {
  steps: ProgressStep[];
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => (
  <div className="progress-bar mb-6">
    <div className="progress-bar__track h-2 bg-gray-200 rounded">
      <div
        className="progress-bar__fill h-2 bg-blue-500 rounded"
        style={{ width: `${(currentStep / steps.length) * 100}%` }}
      />
    </div>
    <div className="progress-bar__steps flex justify-between mt-2">
      {steps.map(step => (
        <div key={step.number} className="progress-step flex flex-col items-center">
          <span className="progress-step__number font-bold">{step.number}</span>
          <span className="progress-step__label text-xs">{step.label}</span>
        </div>
      ))}
    </div>
  </div>
);
