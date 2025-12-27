export const unlockVariants = {
  hidden: {
    x: 120,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    x: -120,
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const burstVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.4, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.6 },
  },
};
