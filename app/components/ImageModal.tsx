'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ImageModalProps {
  src: string;
  onClose: () => void;
}

const ImageModal = ({ src, onClose }: ImageModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-300 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative"
        >
          <img src={src} alt="Project Screenshot" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" />
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-white rounded-full p-1.5 text-black hover:scale-110 transition-transform cursor-pointer"
            aria-label="Close image view"
          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;