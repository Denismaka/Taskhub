# 📋 TaskHub - Application de Gestion de Tâches

Une application moderne de gestion de tâches construite avec React, Vite, et les technologies front-end modernes.

## 🎯 Fonctionnalités

✅ **Inscription / Connexion** avec cookies  
🏠 **Dashboard** avec statistiques en temps réel  
📋 **Liste de tâches** avec CRUD complet  
🏷️ **Catégories de tâches** (6 catégories disponibles)  
📅 **Dates d'échéance** avec alertes en retard  
🔍 **Recherche avancée** en temps réel  
🔎 **Système de filtrage** par statut et catégorie  
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
- [x] Catégories de tâches (Général, Travail, Personnel, Shopping, Santé, Urgent)
- [x] Dates d'échéance avec indicateur visuel
- [x] Alertes automatiques pour tâches en retard
- [x] Badges de catégorie colorés
- [x] Interface visuelle pour tâches en retard (fond rouge)

### 4. Recherche et Filtrage 🔍
- [x] Barre de recherche en temps réel
- [x] Recherche dans titre et description
- [x] Filtrage par statut (Toutes, Actives, Terminées)
- [x] Filtrage par catégorie
- [x] Combinaison des filtres
- [x] Compteur de résultats
- [x] Mise en surbrillance des résultats

### 5. Dashboard 📊
- [x] Statistiques en temps réel
- [x] Compteur de tâches totales
- [x] Compteur de tâches actives
- [x] Compteur de tâches terminées
- [x] Résumé rapide de l'activité

### 6. Communication avec l'API 🌐
- [x] React Query pour la gestion des données
- [x] Fake API avec localStorage
- [x] Simulation de délais réseau
- [x] Cache automatique et invalidation
- [x] Support pour catégories et dates d'échéance

### 7. Animations 🪄
- [x] Animation d'apparition des cartes
- [x] Animation au hover des boutons
- [x] Animation au clic (tap)
- [x] Animation de sortie (exit) avec AnimatePresence
- [x] Transitions fluides

### 8. Composants 🔧
- [x] TaskCard - Carte de tâche avec catégorie et date d'échéance
- [x] Modal - Modal de confirmation
- [x] ProtectedRoute - Route protégée
- [x] ThemeProvider - Gestion du thème

### 9. Autres ⚙️
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

1. ✅ **Hooks de base** : useState, useEffect, useContext, useMemo
2. ✅ **Gestion d'état global** : Zustand
3. ✅ **Context API** : Thème partagé
4. ✅ **Routing** : React Router DOM
5. ✅ **API calls** : React Query (useQuery, useMutation)
6. ✅ **Animations** : Framer Motion
7. ✅ **Formulaires contrôlés** : Validation
8. ✅ **Protected Routes** : Sécurité
9. ✅ **Hooks personnalisés** : useTheme
10. ✅ **Composants réutilisables** : Modal, TaskCard
11. ✅ **Filtrage et recherche** : useMemo pour optimisation
12. ✅ **Gestion de dates** : API Date JavaScript
13. ✅ **Conditional rendering** : Affichage conditionnel

## 🔐 Connexion

Pour tester l'application, vous pouvez utiliser n'importe quel email et mot de passe pour vous connecter

## 🆕 Nouvelles Fonctionnalités

### 🏷️ Catégories de Tâches
Organisez vos tâches en 6 catégories distinctes :
- 📋 **Général** - Tâches de tous les jours
- 💼 **Travail** - Tâches professionnelles
- 👤 **Personnel** - Tâches personnelles
- 🛒 **Shopping** - Liste de courses
- 🏥 **Santé** - Rendez-vous et médicaments
- 🚨 **Urgent** - Tâches prioritaires

Chaque catégorie a un badge coloré unique pour une identification rapide.

### 📅 Dates d'Échéance
- Attribuez une date limite à vos tâches
- Visualisez la date d'échéance sur chaque carte de tâche
- Les tâches en retard sont automatiquement marquées en rouge
- Animation d'alerte pour les tâches dépassées

### 🔍 Recherche Avancée
- Recherchez vos tâches par titre ou description
- Recherche en temps réel pendant la saisie
- Fonctionne avec tous les filtres

### 🔎 Système de Filtrage
- **Par statut** : Toutes, Actives, Terminées
- **Par catégorie** : Filtrer par catégorie spécifique
- **Combinaison** : Utilisez plusieurs filtres simultanément
- **Compteur** : Affiche le nombre de tâches trouvées

## 📝 Notes

- Les données sont stockées dans le localStorage du navigateur
- Le thème est sauvegardé et persiste entre les sessions
- Les cookies sont utilisés pour la session utilisateur
- Les tâches peuvent être organisées par catégories
- Les dates d'échéance alertent automatiquement si dépassées
- La recherche et le filtrage sont optimisés avec useMemo
- Interface responsive pour tous les écrans


## 📖 Documentation

- `README.md` - Ce fichier contient toute la documentation du projet

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

Développé avec ❤️ par Denis Maka pour l'apprentissage de React
