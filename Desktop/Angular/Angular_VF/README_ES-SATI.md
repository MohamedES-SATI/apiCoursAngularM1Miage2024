Auteurs : 
    Mohamed ES-SATI

## Description

AssignmentApp est une application web permettant de gérer des devoirs. Elle est composée d'un front-end développé avec Angular et d'un back-end développé avec Node.js et Express.

## Adresses

- **Front-end** : [http://localhost:4200](http://localhost:4200)
- **Back-end** : [http://localhost:8010/api/assignments](http://localhost:8010/api/assignments)

## Fonctionnalités

### Front-end

- **Affichage des devoirs** : Liste des devoirs avec leur nom, date de rendu et statut (rendu ou non rendu).
- **Ajout de devoirs** : Formulaire pour ajouter un nouveau devoir avec un nom et une date de rendu.
- **Modification de devoirs** : Possibilité de modifier le nom et la date de rendu d'un devoir existant.
- **Suppression de devoirs** : Suppression d'un devoir de la liste.
- **Pagination** : Navigation entre les pages de devoirs.

### Back-end

- **Récupération de tous les devoirs** : Endpoint GET `/api/assignments` pour récupérer tous les devoirs avec pagination.
- **Récupération d'un devoir par ID** : Endpoint GET `/api/assignments/:id` pour récupérer un devoir spécifique par son ID.
- **Ajout d'un devoir** : Endpoint POST `/api/assignments` pour ajouter un nouveau devoir.
- **Modification d'un devoir** : Endpoint PUT `/api/assignments` pour modifier un devoir existant.
- **Suppression d'un devoir** : Endpoint DELETE `/api/assignments/:id` pour supprimer un devoir par son ID.

## Installation

### Prérequis

- Node.js
- Angular CLI

### Instructions

1. Clonez le repository :
   ```bash
   git clone <URL_DU_REPOSITORY>
   cd assignment-app

2. Installez les dépendances pour le front-end :
    cd assignment-app
    npm install

3. Installez les dépendances pour le back-end :
    cd ../api
    npm install

4. Démarrez le serveur back-end :
    node server.js

5. Démarrez le serveur front-end :
    cd ../assignment-app
    ng serve

6. Accédez à l'application :
    Front-end : http://localhost:4200
    Back-end : http://localhost:8010/api/assignments