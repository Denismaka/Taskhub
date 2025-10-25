import { motion } from "framer-motion";

export default function TaskCard({ task, onToggle, onDelete }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg shadow-md mb-3 flex items-start justify-between transition-colors ${
                task.completed
                    ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
                    : "bg-white dark:bg-neutral-800 border-l-4 border-primary-500"
            }`}
        >
            <div className="flex-1">
                <h4
                    className={`font-medium ${
                        task.completed
                            ? "line-through text-neutral-500"
                            : "text-neutral-900 dark:text-white"
                    }`}
                >
                    {task.title}
                </h4>
                {task.description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {task.description}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-2 ml-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onToggle}
                    className={`px-3 py-1.5 text-sm rounded font-medium transition-colors ${
                        task.completed
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                >
                    {task.completed ? "↩️ Annuler" : "✓ Terminer"}
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onDelete}
                    className="px-3 py-1.5 text-sm bg-danger-500 hover:bg-danger-600 text-white rounded font-medium transition-colors"
                >
                    🗑️
                </motion.button>
            </div>
        </motion.div>
    );
}
