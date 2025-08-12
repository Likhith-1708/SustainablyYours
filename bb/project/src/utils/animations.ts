export const scrollRevealVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.2, 0.9, 0.2, 1],
    },
  },
};

export const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const hoverScale = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: 0.2,
    ease: [0.2, 0.9, 0.2, 1],
  },
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.2, 0.9, 0.2, 1],
    },
  },
};

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};