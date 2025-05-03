# TopTrack Explorer

## Description

TopTrack Explorer est une Progressive Web App (PWA) qui permet aux utilisateurs Spotify de visualiser leurs titres et artistes préférés. Après authentification via OAuth 2.0 avec PKCE, l'application présente à l'utilisateur ses 10 titres les plus écoutés ainsi que ses 5 artistes favoris, avec la possibilité d'écouter un extrait de 30 secondes pour chaque titre.

![Spotify Integration](https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png)

## Fonctionnalités

- **Authentification sécurisée** avec Spotify via OAuth 2.0 et PKCE
- **Visualisation des 10 titres les plus écoutés** de l'utilisateur
- **Visualisation des 5 artistes favoris** de l'utilisateur
- **Lecteur audio intégré** pour écouter des extraits de 30 secondes
- **Filtrage par période** (4 semaines, 6 mois, tout le temps)
- **Conformité totale** avec les politiques de développement Spotify
- **Progressive Web App** pour installation sur les appareils mobiles et PC

## Technologies utilisées

- **Frontend**: React 18.2.0, TypeScript 5.0.4, Tailwind CSS 3.3.1
- **Backend**: Node.js 18.x, Express 4.18.2, TypeScript 5.0.4
- **Authentication**: OAuth 2.0 avec PKCE
- **API**: Spotify Web API via spotify-web-api-node 5.0.2
- **Autres**: PWA, Service Workers, HTTPS

## Installation

### Prérequis

- Node.js v18.x ou supérieur
- Npm v8.x ou supérieur
- Un compte développeur Spotify et une application créée sur [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)

### Étapes d'installation

1. Clonez le dépôt:
   ```bash
   git clone https://github.com/votre-username/toptrack-explorer.git
   cd toptrack-explorer
   ```

2. Installez les dépendances:
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement:
    - Copiez les fichiers `.env.example` en `.env` dans les dossiers `client` et `server`
    - Remplissez les variables avec vos informations Spotify

   Pour server/.env:
   ```
   PORT=8000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   SPOTIFY_CLIENT_ID=votre_client_id
   SPOTIFY_CLIENT_SECRET=votre_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:8000/api/auth/callback
   ```

   Pour client/.env:
   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

4. Lancez l'application en mode développement:
   ```bash
   npm run dev
   ```

## Configuration OAuth Spotify

1. Créez une application sur [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Configurez l'URI de redirection: `http://localhost:8000/api/auth/callback`
3. Obtenez votre Client ID et Client Secret
4. Assurez-vous que ces valeurs sont correctement définies dans votre fichier `server/.env`

Les scopes Spotify utilisés sont:
- `user-top-read` (pour accéder aux données d'écoute)
- `user-read-private` (pour accéder aux informations de profil)
- `user-read-email` (pour l'identification de l'utilisateur)

## Utilisation

1. Accédez à `http://localhost:3000` dans votre navigateur
2. Cliquez sur "Se connecter avec Spotify"
3. Autorisez l'application à accéder à vos données
4. Visualisez vos titres et artistes préférés
5. Utilisez les boutons de filtrage pour changer la période
6. Cliquez sur les boutons de lecture pour écouter les extraits

## Structure du projet

```
toptrack-explorer/
├── client/                      # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/          # Composants réutilisables
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/               # Pages de l'application
│   │   ├── utils/               # Utilitaires
│   └── ...
├── server/                      # Backend Node.js
│   ├── src/
│   │   ├── controllers/         # Contrôleurs Express
│   │   ├── middleware/          # Middleware Express
│   │   ├── routes/              # Routes API
│   │   ├── utils/               # Utilitaires
│   │   ├── app.ts               # Configuration Express
│   │   ├── config.ts            # Configuration de l'app
│   │   └── server.ts            # Point d'entrée du serveur
└── ...
```

## Conformité aux politiques Spotify

Cette application est conforme aux [Spotify Developer Policy](https://developer.spotify.com/policy):

- **Non-commerciale**: gratuite, sans publicité ni monétisation
- **Rate Limits & Quotas**: implémente un back-off exponentiel et respecte l'en-tête `Retry-After`
- **Design Guidelines**: respecte les recommandations pour l'affichage des jaquettes et attributions
- **Scopes minimaux**: demande uniquement les scopes nécessaires

## Déploiement

Pour déployer l'application en production:

1. Construisez l'application:
   ```bash
   npm run build
   ```

2. Déployez les dossiers `client/build` et `server/dist` sur votre serveur

3. Assurez-vous de configurer HTTPS sur votre domaine

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

---

Propulsé par l'API Spotify. Ce projet n'est pas affilié à Spotify AB.