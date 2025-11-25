import React from 'react';
import { motion } from 'framer-motion';

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

export function MotionContainer({ children, className = '', ...props }) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function HoverScale({ children, className = '', ...props }) {
  return (
    <motion.div whileHover={{ scale: 1.025 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className={className} {...props}>
      {children}
    </motion.div>
  );
}

export default MotionContainer;
