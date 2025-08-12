import React from 'react';
import { motion } from 'framer-motion';
import { scrollRevealVariants, hoverScale } from '../../utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  clickable = false,
  onClick,
}) => {
  const baseStyles = 'bg-white rounded-xl border border-slate-200 shadow-sm';
  const clickableStyles = clickable ? 'cursor-pointer hover:shadow-md transition-shadow' : '';

  const MotionCard = clickable ? motion.div : motion.div;

  return (
    <MotionCard
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={scrollRevealVariants}
      whileHover={clickable ? hoverScale : undefined}
      className={`${baseStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      {children}
    </MotionCard>
  );
};