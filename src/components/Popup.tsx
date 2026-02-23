import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface PopupProps {
  isOpen: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ isOpen, type, message, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
          >
            <div className="flex justify-center mb-4">
              {type === 'success' && <CheckCircle2 className="w-16 h-16 text-emerald-600" />}
              {type === 'error' && <XCircle className="w-16 h-16 text-red-600" />}
              {type === 'info' && <Info className="w-16 h-16 text-blue-600" />}
            </div>
            <h3 className={
              `text-xl font-bold mb-2 ${
                type === 'success' ? 'text-emerald-800' : 
                type === 'error' ? 'text-red-800' : 'text-blue-800'
              }`
            }>
              {type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Notice'}
            </h3>
            <p className="text-slate-600 mb-6">{message}</p>
            <button
              onClick={onClose}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                type === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 
                type === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              OK
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
