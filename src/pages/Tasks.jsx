import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, addTask, updateTask, deleteTask } from "../api/tasksApi";
import { useState } from "react";
import TaskCard from "../components/TaskCard";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function TasksPage() {
    const qc = useQueryClient();
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const create = useMutation({
        mutationFn: (task) => addTask(task),
        onSuccess() {
            qc.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("✅ Tâche ajoutée avec succès!");
            setTitle("");
            setDescription("");
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
        create.mutate({ title, description, completed: false });
    }

    function handleDeleteClick(task) {
        setTaskToDelete(task);
        setModalOpen(true);
    }

    function handleConfirmDelete() {
        if (taskToDelete) {
            remove.mutate(taskToDelete.id);
        }
    }

    // Filtrer les tâches
    const activeTasks = tasks.filter((t) => !t.completed);
    const completedTasks = tasks.filter((t) => t.completed);

    return (
        <div>
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
                    <button
                        type="submit"
                        disabled={create.isPending}
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
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

                    {/* Tâches terminées */}
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

            {/* Modal de confirmation */}
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
