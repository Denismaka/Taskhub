import { create } from "zustand";
import Cookies from "js-cookie";

const AUTH_COOKIE = "th_auth";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: !!Cookies.get(AUTH_COOKIE),
    login(user) {
        Cookies.set(AUTH_COOKIE, "1", { expires: 7 });
        set({ user, isAuthenticated: true });
    },
    logout() {
        Cookies.remove(AUTH_COOKIE);
        set({ user: null, isAuthenticated: false });
    },
}));

export default useAuthStore;
