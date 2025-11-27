import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ComingSoonModal({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 max-w-md w-full bg-white rounded-xl shadow-2xl p-6"
          >
            <div className="flex justify-end">
              <Dialog.Close className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
            <div className="text-center py-2">
              <h3 className="text-2xl font-bold text-[#2d7a4b] mb-2">Bientôt disponible</h3>
              <p className="text-gray-600">Merci de votre intérêt — Nos formations et services de consulting arriveront bientôt. Inscrivez-vous pour être informé.</p>

              <div className="mt-6 flex flex-col gap-3">
                <a href="/contact?topic=consulting" className="inline-flex justify-center px-4 py-2 rounded-md bg-[#2d7a4b] text-white hover:bg-[#255f3f]">Contacter un conseiller</a>
                <button onClick={() => onOpenChange(false)} className="inline-flex justify-center px-4 py-2 rounded-md border border-gray-200">Fermer</button>
              </div>
            </div>
          </motion.div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
