import { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { useAuthStore } from "./stores/authStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
    const { isDark, toggleTheme } = useTheme();
    const { isAuthenticated, user, logout } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    function handleLogout() {
        logout();
        navigate("/");
        setMobileMenuOpen(false);
    }

    return (
        <div className="app-container">
            {/* Navigation */}
            <nav className="mb-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl">📋</span>
                        <h2 className="text-xl md:text-2xl font-display text-primary-600 dark:text-primary-400 font-bold">
                            TaskHub
                        </h2>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Toggle thème */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                            title={isDark ? "Mode clair" : "Mode sombre"}
                        >
                            {isDark ? "☀️" : "🌙"}
                        </button>

                        {/* Liens de navigation */}
                        <div className="flex items-center gap-3">
                            <Link
                                to="/"
                                className={`text-sm px-3 py-1 rounded transition-colors ${
                                    location.pathname === "/"
                                        ? "bg-primary-500 text-white"
                                        : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                }`}
                            >
                                Accueil
                            </Link>
                            
                            {isAuthenticated ? (
                                <>
                                    {/* Affichage du nom d'utilisateur */}
                                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700">
                                        <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                                            👋 {user?.name || user?.email || "Utilisateur"}
                                        </span>
                                    </div>
                                    
                                    <Link
                                        to="/dashboard"
                                        className={`text-sm px-3 py-1 rounded transition-colors ${
                                            location.pathname === "/dashboard"
                                                ? "bg-primary-500 text-white"
                                                : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/tasks"
                                        className={`text-sm px-3 py-1 rounded transition-colors ${
                                            location.pathname === "/tasks"
                                                ? "bg-primary-500 text-white"
                                                : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                        }`}
                                    >
                                        Tâches
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-sm px-3 py-1 rounded bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                                >
                                    Connexion
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                            title={isDark ? "Mode clair" : "Mode sombre"}
                        >
                            {isDark ? "☀️" : "🌙"}
                        </button>
                        
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mt-4 lg:hidden border-t border-neutral-200 dark:border-neutral-700 pt-4">
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`px-4 py-2 rounded transition-colors ${
                                    location.pathname === "/"
                                        ? "bg-primary-500 text-white"
                                        : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                }`}
                            >
                                🏠 Accueil
                            </Link>
                            
                            {isAuthenticated ? (
                                <>
                                    {/* Nom d'utilisateur mobile */}
                                    <div className="px-4 py-2 rounded bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700">
                                        <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                                            👋 {user?.name || user?.email || "Utilisateur"}
                                        </span>
                                    </div>
                                    
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`px-4 py-2 rounded transition-colors ${
                                            location.pathname === "/dashboard"
                                                ? "bg-primary-500 text-white"
                                                : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                        }`}
                                    >
                                        📊 Dashboard
                                    </Link>
                                    <Link
                                        to="/tasks"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`px-4 py-2 rounded transition-colors ${
                                            location.pathname === "/tasks"
                                                ? "bg-primary-500 text-white"
                                                : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                        }`}
                                    >
                                        ✅ Tâches
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-left rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                                    >
                                        🚪 Déconnexion
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600 transition-colors text-center"
                                >
                                    🔐 Connexion
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <TasksPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Toaster pour les notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: isDark ? "#262626" : "#fff",
                        color: isDark ? "#fff" : "#000",
                    },
                }}
            />

            {/* Footer avec copyright */}
            <footer className="mt-12 py-6 text-center border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-sm muted">
                    © {new Date().getFullYear()} TaskHub - Créé avec ❤️ par{" "}
                    <a 
                        href="https://github.com/Denismaka" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                        Denis Maka
                    </a>
                </p>
            </footer>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
