import { motion } from "framer-motion";

const CATEGORIES = {
    general: { label: '📋 Général', color: 'bg-gray-500' },
    work: { label: '💼 Travail', color: 'bg-blue-500' },
    personal: { label: '👤 Personnel', color: 'bg-green-500' },
    shopping: { label: '🛒 Shopping', color: 'bg-purple-500' },
    health: { label: '🏥 Santé', color: 'bg-red-500' },
    urgent: { label: '🚨 Urgent', color: 'bg-orange-500' },
};

export default function TaskCard({ task, onToggle, onDelete }) {
    const category = CATEGORIES[task.category] || CATEGORIES.general;
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    const isOverdue = dueDate && dueDate < new Date() && !task.completed;
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg shadow-md mb-3 transition-colors ${
                task.completed
                    ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
                    : isOverdue
                    ? "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500"
                    : "bg-white dark:bg-neutral-800 border-l-4 border-primary-500"
            }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-start gap-2">
                        <h4
                            className={`font-medium ${
                                task.completed
                                    ? "line-through text-neutral-500"
                                    : "text-neutral-900 dark:text-white"
                            }`}
                        >
                            {task.title}
                        </h4>
                        {/* Badge de catégorie */}
                        <span className={`px-2 py-1 text-xs text-white rounded-full ${category.color}`}>
                            {category.label.split(' ')[0]}
                        </span>
                    </div>
                    
                    {task.description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            {task.description}
                        </p>
                    )}
                    
                    {/* Date d'échéance */}
                    {dueDate && (
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs font-medium ${isOverdue && !task.completed ? 'text-red-600 dark:text-red-400' : 'text-neutral-500'}`}>
                                📅 Échéance: {dueDate.toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                            {isOverdue && !task.completed && (
                                <span className="text-xs font-bold text-red-600 dark:text-red-400 animate-pulse">
                                    ⚠️ En retard!
                                </span>
                            )}
                        </div>
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
            </div>
        </motion.div>
    );
}
