import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasksApi";
import { useAuthStore } from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
    const { data: tasks = [] } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const activeTasks = tasks.filter((t) => !t.completed).length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const totalTasks = tasks.length;

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">📊 Tableau de bord</h1>
                    <p className="muted mt-1">
                        Bienvenue, {user?.email || "Utilisateur"}!
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        to="/tasks"
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        Voir les tâches
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 border rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                >
                    <div className="text-4xl mb-2">📝</div>
                    <div className="text-3xl font-bold mb-1">{totalTasks}</div>
                    <div className="text-blue-100">Total de tâches</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                >
                    <div className="text-4xl mb-2">🔥</div>
                    <div className="text-3xl font-bold mb-1">{activeTasks}</div>
                    <div className="text-orange-100">Tâches actives</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
                >
                    <div className="text-4xl mb-2">✅</div>
                    <div className="text-3xl font-bold mb-1">{completedTasks}</div>
                    <div className="text-green-100">Tâches terminées</div>
                </motion.div>
            </div>

            {/* Résumé rapide */}
            <div className="card">
                <h2 className="text-xl font-semibold mb-4">📌 Résumé rapide</h2>
                {totalTasks === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-4xl mb-3">🎯</p>
                        <p className="muted mb-4">
                            Vous n'avez pas encore de tâches.
                        </p>
                        <Link
                            to="/tasks"
                            className="inline-block px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                        >
                            Créer ma première tâche
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p>
                            Vous avez <strong>{activeTasks}</strong> tâche{activeTasks > 1 ? "s" : ""} en
                            cours
                        </p>
                        <p>
                            Vous avez terminé <strong>{completedTasks}</strong> tâche{completedTasks > 1 ? "s" : ""}
                        </p>
                        {activeTasks > 0 && (
                            <p className="text-sm muted">
                                Continuez! Il vous reste{" "}
                                <strong>{activeTasks}</strong> tâche{activeTasks > 1 ? "s" : ""} à compléter.
                            </p>
                        )}
                        {completedTasks === totalTasks && totalTasks > 0 && (
                            <p className="text-green-600 dark:text-green-400 font-medium">
                                🎉 Félicitations! Toutes vos tâches sont terminées!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
