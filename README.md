# 📋 Plateforme de Gestion des Réclamations (MEAN Stack)

Cette plateforme est une solution numérique conçue pour moderniser la communication entre les citoyens, les associations et l'administration marocaine (Conseil Provincial). Elle permet une gestion transparente, sécurisée et efficace des réclamations.



## 🚀 Technologies Utilisées

Le projet repose sur une architecture **3-tiers** utilisant la pile **MEAN** :

* **Frontend :** Angular 19.2.7 avec **Angular Material** pour l'interface, **Chart.js** pour les statistiques, et la **Web Speech API** pour la reconnaissance vocale.
* **Backend :** Node.js avec **Express.js**.
* **Base de données :** MongoDB avec l'ODM **Mongoose**.
* **Sécurité :** Authentification basée sur les **JSON Web Tokens (JWT)**.
* **Outils :** **Multer** (upload), **jsPDF** (génération de PDF), et **ExcelJS** (exports).

## 👥 Rôles et Fonctionnalités

### 1. Citoyen
* **Soumission :** Dépôt de réclamations avec description et pièces jointes.
* **Suivi :** Tableau de bord pour consulter l'état des demandes en temps réel.
* **Assistant Virtuel :** Chatbot avec reconnaissance vocale pour guider l'utilisateur.

### 2. Association
* **Gestion Collective :** Inscription avec dossier juridique.
* **Membres :** Importation de la liste des membres via un fichier **Excel**.

### 3. Agent Administratif
* **Traitement :** Validation ou refus motivé des réclamations assignées.
* **Statistiques :** Visualisation des volumes de réclamations par catégorie via des graphiques.

### 4. Administrateur
* **Supervision :** Gestion complète des comptes et des rôles.
* **Assignation :** Affectation des réclamations aux agents disponibles.
* **Reporting :** Exportation de rapports globaux aux formats **Excel et PDF**.



[Image of the MVC design pattern]


## ⚙️ Installation et Configuration

### Prérequis
* Node.js (v20+)
* Angular CLI 19.2.7
* MongoDB

### Backend
1. Naviguez vers le dossier : `cd backend`
2. Installez les dépendances : `npm install`
3. Configurez le fichier `.env` (MONGO_URI, JWT_SECRET)
4. Lancez le serveur : `npm start`

### Frontend
1. Naviguez vers le dossier : `cd frontend`
2. Installez les dépendances : `npm install`
3. Lancez l'application : `ng serve`
4. Accédez à : `http://localhost:4200/`

## 📊 Structure du Projet
```text
├── backend/
│   ├── models/        # Schémas Mongoose
│   ├── routes/        # Endpoints API
│   ├── controllers/   # Logique métier
│   └── uploads/       # Fichiers joints
└── frontend/
    ├── src/app/
    │   ├── modules/   # Admin, Agent, Citoyen
    │   ├── services/  # Communication API
    │   └── guards/    # Sécurité des routes

### Comment l'ajouter à votre projet :
1. Créez un nouveau fichier texte à la racine de votre dossier de projet.
2. Nommez-le exactement `README.md`.
3. Collez le code ci-dessus à l'intérieur.
4. Enregistrez et faites un `git push` vers GitHub.
