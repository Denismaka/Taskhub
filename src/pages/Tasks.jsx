import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, addTask, updateTask, deleteTask } from "../api/tasksApi";
import { useState, useMemo } from "react";
import TaskCard from "../components/TaskCard";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CATEGORIES = [
    { value: 'general', label: '📋 Général', color: 'bg-gray-500' },
    { value: 'work', label: '💼 Travail', color: 'bg-blue-500' },
    { value: 'personal', label: '👤 Personnel', color: 'bg-green-500' },
    { value: 'shopping', label: '🛒 Shopping', color: 'bg-purple-500' },
    { value: 'health', label: '🏥 Santé', color: 'bg-red-500' },
    { value: 'urgent', label: '🚨 Urgent', color: 'bg-orange-500' },
];

export default function TasksPage() {
    const qc = useQueryClient();
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("general");
    const [dueDate, setDueDate] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    
    // Recherche et filtrage
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all"); // all, active, completed
    const [filterCategory, setFilterCategory] = useState("all");

    const create = useMutation({
        mutationFn: (task) => addTask(task),
        onSuccess() {
            qc.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("✅ Tâche ajoutée avec succès!");
            setTitle("");
            setDescription("");
            setCategory("general");
            setDueDate("");
        },
    });

    const toggle = useMutation({
        mutationFn: ({ id, completed }) => updateTask(id, { completed }),
        onSuccess() {
            qc.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("✅ Tâche mise à jour!");
        },
    });

    const remove = useMutation({
        mutationFn: (id) => deleteTask(id),
        onSuccess() {
            qc.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("🗑️ Tâche supprimée!");
            setModalOpen(false);
            setTaskToDelete(null);
        },
    });

    function handleAdd(e) {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("❌ Veuillez entrer un titre");
            return;
        }
        create.mutate({ 
            title, 
            description, 
            completed: false,
            category,
            dueDate: dueDate || null
        });
    }
    
    // Filtrage et recherche des tâches
    const filteredTasks = useMemo(() => {
        let filtered = tasks;
        
        // Filtrage par statut
        if (filterStatus === "active") {
            filtered = filtered.filter((t) => !t.completed);
        } else if (filterStatus === "completed") {
            filtered = filtered.filter((t) => t.completed);
        }
        
        // Filtrage par catégorie
        if (filterCategory !== "all") {
            filtered = filtered.filter((t) => t.category === filterCategory);
        }
        
        // Recherche
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (t) =>
                    t.title.toLowerCase().includes(query) ||
                    (t.description && t.description.toLowerCase().includes(query))
            );
        }
        
        return filtered;
    }, [tasks, filterStatus, filterCategory, searchQuery]);

    function handleDeleteClick(task) {
        setTaskToDelete(task);
        setModalOpen(true);
    }

    function handleConfirmDelete() {
        if (taskToDelete) {
            remove.mutate(taskToDelete.id);
        }
    }

    // Filtrer les tâches par statut
    const activeTasks = filteredTasks.filter((t) => !t.completed);
    const completedTasks = filteredTasks.filter((t) => t.completed);

    return (
        <div>
            {/* Barre de recherche et filtres */}
            <div className="card mb-6">
                <h3 className="text-xl font-semibold mb-4">🔍 Recherche et filtres</h3>
                
                {/* Barre de recherche */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                        placeholder="🔍 Rechercher une tâche..."
                    />
                </div>
                
                {/* Filtres */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Filtre par statut */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Statut</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                        >
                            <option value="all">Toutes</option>
                            <option value="active">🔥 Actives</option>
                            <option value="completed">✅ Terminées</option>
                        </select>
                    </div>
                    
                    {/* Filtre par catégorie */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Catégorie</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                        >
                            <option value="all">Toutes les catégories</option>
                            {CATEGORIES.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {/* Compteur de résultats */}
                <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {filteredTasks.length === 0
                            ? "Aucune tâche trouvée"
                            : `${filteredTasks.length} tâche${filteredTasks.length > 1 ? "s" : ""} trouvée${filteredTasks.length > 1 ? "s" : ""}`}
                    </p>
                </div>
            </div>

            {/* Formulaire d'ajout */}
            <div className="card mb-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
                <h3 className="text-xl font-semibold mb-4">➕ Ajouter une nouvelle tâche</h3>
                <form onSubmit={handleAdd} className="space-y-3">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                        placeholder="Titre de la tâche *"
                        disabled={create.isPending}
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                        placeholder="Description (optionnel)"
                        disabled={create.isPending}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Sélection de catégorie */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Catégorie</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                                disabled={create.isPending}
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Date d'échéance */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Date d'échéance</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                                disabled={create.isPending}
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={create.isPending}
                        className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {create.isPending ? "Ajout..." : "Ajouter la tâche"}
                    </button>
                </form>
            </div>

            {/* Liste des tâches */}
            {isLoading ? (
                <div className="text-center py-8">
                    <p className="muted">⏳ Chargement...</p>
                </div>
            ) : tasks.length === 0 ? (
                <div className="card text-center py-12">
                    <p className="text-4xl mb-4">📝</p>
                    <p className="text-lg muted">Aucune tâche pour le moment</p>
                    <p className="text-sm muted mt-2">Commencez par ajouter votre première tâche!</p>
                </div>
            ) : (
                <>
                    {/* Tâches actives */}
                    {activeTasks.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                🔥 Tâches actives ({activeTasks.length})
                            </h3>
                            <AnimatePresence>
                                {activeTasks.map((t) => (
                                    <TaskCard
                                        key={t.id}
                                        task={t}
                                        onToggle={() =>
                                            toggle.mutate({
                                                id: t.id,
                                                completed: !t.completed,
                                            })
                                        }
                                        onDelete={() => handleDeleteClick(t)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Tches terminées */}
                    {completedTasks.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                ✅ Tâches terminées ({completedTasks.length})
                            </h3>
                            <AnimatePresence>
                                {completedTasks.map((t) => (
                                    <TaskCard
                                        key={t.id}
                                        task={t}
                                        onToggle={() =>
                                            toggle.mutate({
                                                id: t.id,
                                                completed: !t.completed,
                                            })
                                        }
                                        onDelete={() => handleDeleteClick(t)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </>
            )}

            {/* Modal de confimation */}
            <Modal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setTaskToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title="⚠️ Confirmer la suppression"
                message={`Êtes-vous sûr de vouloir supprimer la tâche "${taskToDelete?.title}"? Cette action est irréversible.`}
            />
        </div>
    );
}
