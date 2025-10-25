# 📚 Guide d'Apprentissage React - TaskHub

## Table des matières

1. [Les Hooks de base](#les-hooks-de-base)
2. [La gestion d'état](#la-gestion-détat)
3. [Le routing](#le-routing)
4. [Les animations](#les-animations)
5. [La communication avec une API](#la-communication-avec-une-api)

---

## Les Hooks de base

### 1. useState

Permet de gérer l'état local d'un composant.

```jsx
const [email, setEmail] = useState("");
```

**Où l'utiliser ?**
- Formulaire (email, password dans Login.jsx)
- Valeurs qui changent et doivent être affichées

### 2. useEffect

Exécute des effets de bord (side effects).

```jsx
useEffect(() => {
    // Code qui s'exécute après chaque rendu
    console.log("Le composant est monté");
}, []); // Tableau de dépendances vide
```

**Où l'utiliser ?**
- Dans ThemeContext.jsx pour sauvegarder le thème
- Charger des données au montage du composant

### 3. useContext

Permet d'accéder à un contexte partagé.

```jsx
const { isDark, toggleTheme } = useTheme();
```

**Où l'utiliser ?**
- Pour partager le thème dans toute l'application
- Évite de passer des props de composant en composant

---

## La gestion d'état

### 1. Zustand (Store global)

Zustand est une bibliothèque légère pour gérer l'état global.

**Fichier: src/stores/authStore.js**

```jsx
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    login(user) {
        set({ user, isAuthenticated: true });
    },
}));
```

**Comment l'utiliser ?**

```jsx
// Lre l'état
const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

// Utliser une action
const login = useAuthStore((s) => s.login);
```

**Pourquoi Zustand ?**
- Plus simple que Redux
- Pas besoin de Provider au top level
- Performant
- TypeScript-friendly

### 2. Context API (Theme)

Pour partager le thème partout.

**Fichier: src/contexts/ThemeContext.jsx**

```jsx
<ThemeProvider>
    <App />
</ThemeProvider>
```

Ensuite, dans n'importe quel composant :
```jsx
const { isDark, toggleTheme } = useTheme();
```

---

## Le routing

### Routes de base

```jsx
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

### Navigation

```jsx
import { useNavigate, Link } from "react-router-dom";

// Programmeur
const navigate = useNavigate();
navigate("/dashboard");

// Composat Link(pour les liens)
<Link to="/dashboard">Dashboard</Link>
```

### Protected Routes

Routes protégées qui vérifient si l'utilisateur est connecté.

```jsx
// src/components/ProtectedRoute.jsx
if (!isAuthenticated) {
    return <Navigate to="/login" />;
}
```

---

## Les animations

### Framer Motion

Bibliothèque pour créer des animations fluides.

**Animation d'apparition**
```jsx
<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
>
    Contenu
</motion.div>
```

**Animation au hover**
```jsx
<motion.button whileHover={{ scale: 1.05 }}>
    Clique-moi
</motion.button>
```

**Animation au clic**
```jsx
<motion.button whileTap={{ scale: 0.95 }}>
    Clique-moi
</motion.button>
```

**Liste animée avec AnimatePresence**
```jsx
<AnimatePresence>
    {tasks.map(task => (
        <motion.div
            key={task.id}
            exit={{ opacity: 0 }}
        >
            {task.title}
        </motion.div>
    ))}
</AnimatePresence>
```

---

## La communication avec une API

### React Query (TanStack Query)

Gère les requêtes serveur, le cache, et la synchronisation.

**Définir le Provider** (déjà fait dans main.jsx)
```jsx
<QueryClientProvider client={queryClient}>
    <App />
</QueryClientProvider>
```

**Utiliser useQuery pour récupérer des données**

```jsx
const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
});
```

- `queryKey`: Identifiant unique de la requête
- `queryFn`: Fonction qui récupère les données
- `data`: Les données retournées
- `isLoading`: Si la requête est en cours

**Utiliser useMutation pour modifier des données**

```jsx
const create = useMutation({
    mutationFn: (task) => addTask(task),
    onSuccess() {
        // Invalider le cache pour rafraîchir les données
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("Tâche ajoutée!");
    },
});
```

L'utiliser :
```jsx
create.mutate({ title: "Ma tâche" });
```

---

## Structure d'un composant React

```jsx
// 1. Imports
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

// 2. Définition du composant
export default function MonComposant() {
    // 3. Hooks (toujours au début)
    const [count, setCount] = useState(0);
    const user = useAuthStore((s) => s.user);

    // 4. Fonctions
    function handleClick() {
        setCount(count + 1);
    }

    // 5. JSX (ce qui est affiché)
    return (
        <div>
            <h1>Mon titre</h1>
            <p>Compteur: {count}</p>
            <button onClick={handleClick}>Incrementer</button>
        </div>
    );
}
```

---

## Conseils pour débuter

1. **Lisez le code** : Commencez par comprendre chaque fichier
2. **Modifiez** : Changez des couleurs, des textes
3. **Ajoutez** : Créez une nouvelle fonctionnalité simple
4. **Débuggez** : Utilisez `console.log()` pour comprendre ce qui se passe
5. **Pratiquez** : Refaites le projet de zéro pour mémoriser

---

## Ressources utiles

- [React Documentation](https://react.dev)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [React Query Documentation](https://tanstack.com/query)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)

---

Bon apprentissage ! 🚀
