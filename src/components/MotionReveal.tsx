'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  x?: number;
  y?: number;
};

const createVariants = (x: number, y: number): Variants => ({
  hidden: {
    opacity: 0,
    x,
    y,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const MotionReveal = ({
  children,
  className,
  delay = 0,
  amount = 0.2,
  x = 0,
  y = 28,
}: MotionRevealProps) => {
  return (
    <motion.div
      className={className}
      variants={createVariants(x, y)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  amount?: number;
};

export const MotionStagger = ({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.12,
  amount = 0.15,
}: MotionStaggerProps) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
};

