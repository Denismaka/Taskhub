import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const login = useAuthStore((s) => s.login);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (!email.trim() || !password.trim() || !name.trim()) {
            toast.error("❌ Veuillez remplir tous les champs");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("❌ Les mots de passe ne correspondent pas");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            toast.error("❌ Le mot de passe doit contenir au moins 6 caractères");
            setIsLoading(false);
            return;
        }

        // Simule un délai d'inscription
        setTimeout(() => {
            login({ email, name });
            toast.success(`🎉 Bienvenue ${name} ! Votre compte a été créé.`);
            setIsLoading(false);
            navigate("/dashboard");
        }, 500);
    }

    return (
        <div className="max-w-md mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
            >
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-2">📝 Inscription</h2>
                    <p className="muted">Créez votre compte TaskHub</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                            placeholder="Votre nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:border-neutral-600"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "⏳ Création du compte..." : "Créer mon compte"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm muted">
                        Vous avez déjà un compte?{" "}
                        <Link to="/login" className="text-primary-500 hover:underline">
                            Se connecter
                        </Link>
                    </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        💡 <strong>Pour tester:</strong> Remplissez le formulaire avec
                        n'importe quelles informations valides.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
