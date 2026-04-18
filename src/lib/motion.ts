import type { Transition, Variants } from "framer-motion";

export const ease = {
  outQuint: [0.22, 1, 0.36, 1],
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuint: [0.83, 0, 0.17, 1],
} as const;

export const duration = {
  fast: 0.15,
  base: 0.25,
  mid: 0.4,
  slow: 0.6,
  xslow: 0.8,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.mid, ease: ease.outQuint },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.mid, ease: ease.outQuint },
  },
};

export const staggerChildren = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const drawerSlideIn: Transition = {
  duration: duration.base,
  ease: ease.outQuint,
};

export const accordionTransition: Transition = {
  duration: duration.base,
  ease: ease.inOutQuint,
};
