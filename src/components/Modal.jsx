import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ isOpen, onClose, onConfirm, title, message }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-md w-full shadow-lg"
                        >
                            <h3 className="text-lg font-semibold mb-2">{title}</h3>
                            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                                {message}
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 border rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="px-4 py-2 bg-danger-500 text-white rounded hover:bg-danger-600"
                                >
                                    Confirmer
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
