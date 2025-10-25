import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-6xl mb-4">📋</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Bienvenue sur TaskHub
                </h1>
                <p className="text-lg muted mb-8 max-w-2xl mx-auto">
                    La solution simple et moderne pour gérer vos tâches quotidiennes.
                    Organisez-vous efficacement avec une interface intuitive et des
                    fonctionnalités puissantes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                        to="/register"
                        className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-lg transition-all transform hover:scale-105"
                    >
                        🚀 Créer un compte
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-3 border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg font-medium text-lg transition-all"
                    >
                        Se connecter
                    </Link>
                </div>
            </motion.div>

            {/* Fonctionnalités */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card"
                >
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className="text-xl font-semibold mb-2">Gestion simple</h3>
                    <p className="muted">
                        Créez, modifiez et supprimez vos tâches en un clic. Interface
                        intuitive et rapide.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card"
                >
                    <div className="text-4xl mb-3">🎨</div>
                    <h3 className="text-xl font-semibold mb-2">Mode sombre</h3>
                    <p className="muted">
                        Personnalisez votre expérience avec le mode sombre ou clair selon
                        vos préférences.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card"
                >
                    <div className="text-4xl mb-3">🔄</div>
                    <h3 className="text-xl font-semibold mb-2">Temps réel</h3>
                    <p className="muted">
                        Vos données sont sauvegardées automatiquement. Synchronisation
                        instantanée.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
