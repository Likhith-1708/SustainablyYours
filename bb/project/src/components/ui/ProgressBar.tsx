import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  return (
    <div className={`w-full bg-slate-200 rounded-full h-2 ${className}`}>
      <motion.div
        className="bg-emerald-500 h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${Math.round(progress)}% complete`}
      />
    </div>
  );
};