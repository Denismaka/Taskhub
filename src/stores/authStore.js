import { create } from "zustand";
import Cookies from "js-cookie";

const AUTH_COOKIE = "th_auth";
const USER_STORAGE_KEY = "th_user";

// Fonction pour charger l'utilisateur depuis localStorage
function loadUserFromStorage() {
    try {
        const userData = localStorage.getItem(USER_STORAGE_KEY);
        return userData ? JSON.parse(userData) : null;
    } catch {
        return null;
    }
}

// Fonction pour sauvegarder l'utilisateur dans localStorage
function saveUserToStorage(user) {
    try {
        if (user) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
    }
}

export const useAuthStore = create((set) => ({
    user: loadUserFromStorage(),
    isAuthenticated: !!Cookies.get(AUTH_COOKIE),
    
    login(user) {
        // Sauvegarde le cookie pour la session
        Cookies.set(AUTH_COOKIE, "1", { expires: 7 });
        
        // Sauvegarde les données utilisateur dans localStorage
        saveUserToStorage(user);
        
        set({ user, isAuthenticated: true });
    },
    
    logout() {
        // Supprime le cookie
        Cookies.remove(AUTH_COOKIE);
        
        // Supprime les données utilisateur du localStorage
        saveUserToStorage(null);
        
        set({ user: null, isAuthenticated: false });
    },
}));

export default useAuthStore;
