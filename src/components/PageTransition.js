import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotateY: -30,
  },
  in: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  out: {
    opacity: 0,
    scale: 1.2,
    rotateY: 30,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        perspective: '1000px',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 