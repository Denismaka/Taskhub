# 🚀 Guide de Déploiement sur GitHub Pages

## Étapes pour déployer TaskHub sur GitHub Pages

### 1. Préparer le projet

1. Assurez-vous que votre projet est poussé sur GitHub
2. Votre branche principale est `master` (déjà configuré)

### 2. Configurer GitHub Pages

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous **Source**, sélectionnez **GitHub Actions**
5. Cliquez sur **Save** (Enregistrer)

### 3. Modifier la configuration base path

Dans `vite.config.js`, le `base` est déjà configuré pour votre repository GitHub : `'/Taskhub/'`

### 4. Pousser les changements

```bash
git add .
git commit -m "Configurer le déploiement GitHub Pages"
git push origin master
```

### 5. Vérifier le déploiement

1. Allez dans l'onglet **Actions** de votre repository
2. Vous verrez le workflow "Deploy to GitHub Pages" en cours d'exécution
3. Une fois terminé (coche verte), votre site sera disponible à l'adresse :
   ```
   https://[votre-username].github.io/[nom-du-repo]/
   ```

### 6. Accéder à votre site

Une fois déployé, votre application sera accessible sur :
- **https://denismaka.github.io/Taskhub/**

## ⚙️ Commandes utiles

- `npm run build` - Créer une version de production
- `npm run preview` - Prévisualiser la version de production localement
- `npm run deploy` - Déployer manuellement (nécessite gh-pages)

## 🔄 Mise à jour automatique

À chaque push sur la branche `master`, le site sera automatiquement mis à jour via GitHub Actions.

## 🐛 Résolution de problèmes

### Le site affiche une page blanche
- Vérifiez que le `base` dans `vite.config.js` correspond au nom de votre repo
- Vérifiez la console du navigateur pour les erreurs

### Le workflow échoue
- Vérifiez que GitHub Pages est bien activé dans les Settings
- Vérifiez que la source est bien "GitHub Actions"
- Regardez les logs du workflow dans l'onglet Actions

## 📝 Notes

- Le déploiement peut prendre quelques minutes
- Les routes React Router fonctionnent avec le paramètre `base` configuré
- Les données sont stockées dans le localStorage local de chaque visiteur

---

Bon déploiement ! 🎉
