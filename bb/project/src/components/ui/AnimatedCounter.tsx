import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  duration = 2000,
  suffix = '',
  prefix = '',
}) => {
  const [count, setCount] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const startTime = Date.now();
    const difference = to - from;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const current = from + (difference * easeOutCubic);
      setCount(Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };

    const timer = setTimeout(animate, 100);
    return () => clearTimeout(timer);
  }, [from, to, duration, hasAnimated]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};