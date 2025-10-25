import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Basename pour GitHub Pages
const basename = import.meta.env.BASE_URL;

// Global error overlay fallback: if runtime errors happen before React can render,
// this will inject a visible banner with the error message so we don't get a silent white page.
function showFatalError(message) {
    try {
        const existing = document.getElementById("fatal-error-overlay");
        if (existing) existing.remove();
        const el = document.createElement("div");
        el.id = "fatal-error-overlay";
        el.style.position = "fixed";
        el.style.left = "8px";
        el.style.right = "8px";
        el.style.top = "8px";
        el.style.zIndex = 99999;
        el.style.background = "#ff4d4f";
        el.style.color = "white";
        el.style.padding = "12px";
        el.style.borderRadius = "6px";
        el.style.fontFamily = "sans-serif";
        el.style.whiteSpace = "pre-wrap";
        el.textContent = "ERROR: " + message;
        document.body.appendChild(el);
    } catch {
        // ignore
    }
}

window.addEventListener("error", (ev) => {
    showFatalError(ev.message || String(ev.error) || "Unknown error");
});
window.addEventListener("unhandledrejection", (ev) => {
    showFatalError(
        ev.reason
            ? ev.reason.message || String(ev.reason)
            : "Unhandled rejection"
    );
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename={basename}>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
