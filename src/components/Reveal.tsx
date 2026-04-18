"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
}: React.PropsWithChildren<{
  delay?: number;
  y?: number;
  className?: string;
}>) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px", amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.21, 0.9, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

