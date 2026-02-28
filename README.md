# Portfolio Professionnel — Fullstack JavaScript

## Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Architecture](#-architecture)
- [API](#-api)

---

## À propos

Ce projet est un **portfolio fullstack complet** développé en JavaScript moderne, conçu pour présenter votre profil professionnel lors de recherches de **stage, d'alternance ou d'emploi**.

### Objectifs
✅ Présenter un profil professionnel complet et attractif  
✅ Gérer et mettre à jour vos projets et compétences facilement  
✅ Permettre aux visiteurs de vous contacter directement  
✅ Fonctionner avec ou sans backend (API REST)  
✅ Être facilement déployable via Docker  

---

## Fonctionnalités

### Partie Publique
- **Page Profil** : Présentation personnel, CV téléchargeable, photo de profil
- **Galerie Projets** : Affichage élégant de vos réalisations avec descriptions et liens
- **Compétences** : Listing organisé de vos compétences techniques et transversales
- **Formulaire de Contact** : Formulaire sécurisé pour recevoir des messages
- **Design Responsive** : Optimisé pour mobile, tablette et desktop

### Espace d'Administration
- **Authentification sécurisée** : Connexion JWT protégée
- **Gestion des Projets** : Créer, modifier, supprimer vos projets (CRUD complet)
- **Gestion des Compétences** : Maintenir à jour vos technologies et skills
- **Gestion des Messages** : Consulter et gérer les messages de contact reçus
- **Mise à Jour du Profil** : Modifier facilement vos informations personnelles

### Backend
- **API REST complète** : Endpoints bien structurés et documentés
- **Authentification JWT** : Sécurisation des routes administrateur
- **Chiffrement des données** : Utilisation de bcrypt pour les mots de passe
- **Validation des données** : Vérifications côté serveur

---

## Stack technique

### Frontend
| Technologie | Usage |
|---|---|
| **React** | Framework UI moderne avec Hooks |
| **Vite** | Bundler ultra-rapide et dev server |
| **CSS3** | Styling moderne et responsive |

### Backend
| Technologie | Usage |
|---|---|
| **Node.js** | Runtime JavaScript côté serveur |
| **Express.js** | Framework web minimaliste et performant |
| **MongoDB** | Base de données NoSQL flexible |
| **Mongoose** | ODM pour MongoDB |

### Sécurité & Auth
| Technologie | Usage |
|---|---|
| **JWT** | Authentification stateless |
| **bcrypt** | Chiffrement des mots de passe |
| **CORS** | Gestion des requêtes cross-origin |

### Infrastructure
| Technologie | Usage |
|---|---|
| **Docker** | Conteneurisation de l'application |
| **Docker Compose** | Orchestration multi-conteneurs |

---

## Prérequis

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 ou **yarn** >= 1.22.0
- **MongoDB** >= 5.0 (local ou Atlas)
- **Docker** & **Docker Compose** (optionnel, pour la conteneurisation)
- **Git** pour le versioning

---

## Installation

### Option 1 : Installation standard

#### 1️⃣ Cloner le repository
```bash
git clone https://github.com/votreusername/portfolio.git
cd portfolio
```

#### 2️⃣ Installation du Backend
```bash
cd backend
npm install
```

Créer un fichier `.env` à la racine du dossier `backend` :
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### 3️⃣ Installation du Frontend
```bash
cd ../frontend
npm install
```

Créer un fichier `.env.local` à la racine du dossier `frontend` :
```env
VITE_API_URL=http://localhost:5000/api
```

#### 4️⃣ Lancer MongoDB
```bash
# Avec MongoDB local
mongod

# Ou avec Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### 5️⃣ Démarrer l'application

**Backend** (dans un terminal) :
```bash
cd backend
npm start
```

**Frontend** (dans un autre terminal) :
```bash
cd frontend
npm run dev
```

L'application est accessible sur `http://localhost:5173`

### Option 2 : Installation avec Docker

```bash
# À partir de la racine du projet
docker-compose up -d
```

L'application sera disponible sur `http://localhost:5173`

---

## Configuration

### Variables d'environnement Backend

| Variable | Description | Exemple |
|---|---|---|
| `MONGODB_URI` | URI de connexion MongoDB | `mongodb://localhost:27017/portfolio` |
| `PORT` | Port du serveur | `5000` |
| `JWT_SECRET` | Clé secrète JWT | `votre_clé_secrète_forte` |
| `NODE_ENV` | Environnement | `development` \| `production` |
| `CORS_ORIGIN` | Origine CORS autorisée | `http://localhost:5173` |

### Variables d'environnement Frontend

| Variable | Description | Exemple |
|---|---|---|
| `VITE_API_URL` | URL de l'API backend | `http://localhost:5000/api` |

---

## Utilisation

### Accès à l'application

| Partie | URL | Accès |
|---|---|---|
| **Homepage** | `http://localhost:5173` | Public |
| **Admin Panel** | `http://localhost:5173/admin` | Authentifié |
| **API** | `http://localhost:5000/api` | Public/Authentifié |

### Première connexion Admin
1. Créer un compte via `/signup`
2. Se connecter via `/login`
3. Accéder à `/admin` pour gérer le contenu

---

## Architecture

```
portfolio/
├── backend/                          # API REST Node.js/Express
│   ├── controllers/                  # Logique métier
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── skillsController.js
│   │   ├── presentationController.js
│   │   └── messageController.js
│   ├── routes/                       # Définition des routes
│   ├── models/                       # Schémas MongoDB/Mongoose
│   ├── middlewares/                  # Middlewares Express
│   │   └── authMiddleware.js         # Vérification JWT
│   ├── db/                           # Configuration MongoDB
│   ├── server.js                     # Point d'entrée
│   ├── package.json
│   └── Dockerfile
│
├── frontend/                         # Application React + Vite
│   ├── src/
│   │   ├── components/              # Composants réutilisables
│   │   │   ├── atoms/               # Composants basiques
│   │   │   ├── molecules/           # Composants composés
│   │   │   └── organisms/           # Composants complexes
│   │   ├── pages/                   # Pages principales
│   │   │   ├── Homepage
│   │   │   ├── Loginpage
│   │   │   ├── Adminpage
│   │   │   └── Contactpage
│   │   ├── layout/                  # Layouts (Header, Footer)
│   │   ├── assets/                  # Images et ressources
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml               # Configuration conteneurs
└── README.md                        # Ce fichier
```

---

## API

### Base URL
```
http://localhost:5000/api
```

### Endpoints principaux

#### Authentication
- `POST /auth/signup` - Créer un compte
- `POST /auth/login` - Connexion
- `POST /auth/logout` - Déconnexion

#### Projects
- `GET /projects` - Lister tous les projets
- `GET /projects/:id` - Détail d'un projet
- `POST /projects` - Créer un projet *(authentifié)*
- `PUT /projects/:id` - Modifier un projet *(authentifié)*
- `DELETE /projects/:id` - Supprimer un projet *(authentifié)*

#### Skills
- `GET /skills` - Lister toutes les compétences
- `POST /skills` - Créer une compétence *(authentifié)*
- `PUT /skills/:id` - Modifier une compétence *(authentifié)*
- `DELETE /skills/:id` - Supprimer une compétence *(authentifié)*

#### Messages
- `GET /messages` - Lister les messages *(authentifié)*
- `POST /messages` - Envoyer un message
- `DELETE /messages/:id` - Supprimer un message *(authentifié)*

#### Presentation
- `GET /presentation` - Récupérer les infos du profil
- `PUT /presentation` - Mettre à jour le profil *(authentifié)*


