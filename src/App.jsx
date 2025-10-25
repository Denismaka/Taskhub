import { Routes, Route, Link, useLocation } from "react-router-dom";
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
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();

    return (
        <div className="app-container">
            {/* Navigation */}
            <nav className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    <h2 className="text-2xl font-display text-primary-600 dark:text-primary-400 font-bold">
                        TaskHub
                    </h2>
                </Link>
                
                <div className="flex items-center gap-4">
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
