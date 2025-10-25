# 📋 TaskHub - Application de Gestion de Tâches

Une application moderne de gestion de tâches construite avec React, Vite, et les technologies front-end modernes.

## 🎯 Fonctionnalités

✅ **Inscription / Connexion** avec cookies  
🏠 **Dashboard** avec statistiques en temps réel  
📋 **Liste de tâches** avec CRUD complet  
🌐 **Données distantes** gérées avec React Query  
🔔 **Notifications toast** pour les actions  
🪄 **Animations** avec Framer Motion  
⚙️ **Modal de confirmation** avant suppression  
🔒 **Protection des routes**  
💾 **Mode sombre / clair**  
🎨 **Interface moderne** avec Tailwind CSS

## ✅ Fonctionnalités Détaillées

### 1. Authentification ✅
- [x] Page de connexion avec validation
- [x] Gestion des sessions avec cookies (js-cookie)
- [x] Store Zustand pour l'état global d'authentification
- [x] Protection des routes privées
- [x] Déconnexion

### 2. Interface Utilisateur 🎨
- [x] Design moderne et responsive avec Tailwind CSS
- [x] Mode sombre / clair avec toggle (useContext)
- [x] Navigation avec React Router DOM
- [x] Animations fluides avec Framer Motion
- [x] Notifications toast avec react-hot-toast

### 3. Gestion des Tâches 📋
- [x] Liste de tâches avec CRUD complet
- [x] Ajout de nouvelles tâches
- [x] Mise à jour du statut (complété / actif)
- [x] Suppression avec modal de confirmation
- [x] Séparation tâches actives / terminées
- [x] Persistance dans localStorage

### 4. Dashboard 📊
- [x] Statistiques en temps réel
- [x] Compteur de tâches totales
- [x] Compteur de tâches actives
- [x] Compteur de tâches terminées
- [x] Résumé rapide de l'activité

### 5. Communication avec l'API 🌐
- [x] React Query pour la gestion des données
- [x] Fake API avec localStorage
- [x] Simulation de délais réseau
- [x] Cache automatique et invalidation

### 6. Animations 🪄
- [x] Animation d'apparition des cartes
- [x] Animation au hover des boutons
- [x] Animation au clic (tap)
- [x] Animation de sortie (exit) avec AnimatePresence
- [x] Transitions fluides

### 7. Composants 🔧
- [x] TaskCard - Carte de tâche
- [x] Modal - Modal de confirmation
- [x] ProtectedRoute - Route protégée
- [x] ThemeProvider - Gestion du thème

### 8. Autres ⚙️
- [x] Validation des formulaires
- [x] Messages d'erreur et de succès
- [x] Loading states
- [x] Empty states
- [x] Documentation complète

## 🚀 Démarrage

### Installation

```bash
npm install
```

### Lancement en mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build pour production

```bash
npm run build
```

### Linter

```bash
npm run lint
```

## 🛠 Technologies utilisées

- **React 19** - Bibliothèque UI
- **Vite** - Build tool ultra-rapide
- **React Router DOM** - Navigation SPA
- **Zustand** - State management léger
- **React Query (TanStack Query)** - Gestion des données serveur
- **Framer Motion** - Animations fluides
- **React Hot Toast** - Notifications
- **Tailwind CSS** - Styling utilitaire
- **js-cookie** - Gestion des cookies
- **PostCSS** - Préprocesseur CSS

## 📁 Structure du projet

```
src/
├── api/           # API fake (localStorage)
├── components/    # Composants réutilisables
│   ├── Modal.jsx
│   ├── ProtectedRoute.jsx
│   └── TaskCard.jsx
├── contexts/      # Contextes React (Theme)
│   └── ThemeContext.jsx
├── pages/         # Pages de l'application
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   └── Tasks.jsx
└── stores/        # Store Zustand (Auth)
    └── authStore.js
```

## 🎓 Concepts React Pratiqués

1. ✅ **Hooks de base** : useState, useEffect, useContext
2. ✅ **Gestion d'état global** : Zustand
3. ✅ **Context API** : Thème partagé
4. ✅ **Routing** : React Router DOM
5. ✅ **API calls** : React Query (useQuery, useMutation)
6. ✅ **Animations** : Framer Motion
7. ✅ **Formulaires contrôlés** : Validation
8. ✅ **Protected Routes** : Sécurité
9. ✅ **Hooks personnalisés** : useTheme
10. ✅ **Composants réutilisables** : Modal, TaskCard

## 🔐 Connexion

Pour tester l'application, vous pouvez utiliser n'importe quel email et mot de passe pour vous connecter (l'authentification est factice pour la démo).

## 📝 Notes

- Les données sont stockées dans le localStorage du navigateur
- Le thème est sauvegardé et persiste entre les sessions
- Les cookies sont utilisés pour la session utilisateur

## 🎯 Prochaines Étapes Possibles

Pour continuer à apprendre, vous pouvez :

1. Ajouter une page d'inscription
2. Ajouter des catégories de tâches
3. Ajouter des dates d'échéance
4. Ajouter un système de recherche
5. Ajouter un système de filtrage
6. Intégrer une vraie API backend
7. Ajouter des tests unitaires
8. Ajouter TypeScript

## 💡 Conseils d'Apprentissage

1. **Lisez le code** : Chaque fichier est commenté pour faciliter la compréhension
2. **Expérimentez** : Modifiez les couleurs, les textes, ajoutez des fonctionnalités
3. **Comprenez les concepts** : Lisez le fichier `APPRENTISSAGE.md`
4. **Pratiquez** : Refaites le projet de zéro pour bien comprendre
5. **Questionnez** : Si vous ne comprenez pas quelque chose, cherchez la réponse

## 📖 Documentation

- `README.md` - Ce fichier
- `APPRENTISSAGE.md` - Guide d'apprentissage détaillé

## 📬 Contact

Pour toute question, collaboration ou devis :

- **Email** : makadenis370@gmail.com
- **Téléphone** : +243 818 252 385 / +243 997 435 030
- **Réseaux sociaux** :
  - [Twitter](https://twitter.com/MakaDenis3)
  - [LinkedIn](https://www.linkedin.com/in/Denismaka)
  - [GitHub](https://github.com/Denismaka)
  - [Facebook](https://www.facebook.com/Denismaka)

---

Merci pour votre visite et votre intérêt ! ✨

Développé avec ❤️ pour l'apprentissage de React
