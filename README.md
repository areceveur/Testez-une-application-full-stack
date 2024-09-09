# Projet 5 : Tester une application full-stack

## Description

Ce projet consiste à tester une application proposant à des utilisateurs de s'inscrire à une session de yoga.
Les tests sont réalisés pour le front-end, le back-end et en end-to-end.

Une couverture de 80% minimum pour chaque test est réalisée, avec 30% de tests d'intégration.

## Installation

### Pré-requis

Libraries à installer pour faire fonctionner le projet :

- Java 11 ou 17
- Node.js et npm
- Spring Boot 3
- MySQL
- JUNIT5
- Cypress
- Jest

### Étapes d'installation

1. Clonage du repository

> git clone https://github.com/areceveur/Testez-une-application-full-stack.git

Se rendre dans le dossier:

> cd Testez-une-application-full-stack

2. Création de la base de données

> CREATE DATABASE test;

Il faut mettre à jour le fichier `applications.properties` avec les informations de connexion de la base de données.

3. Création des tables de la base de données

Exécuter le script dans le fichier `ressources/sql/script.sql`.

4. Installation les dépendances

> npm install

4. Lancement du back-end

Exécuter le fichier `SpringBootSecurityJwtApplication`.

5. Lancement du front-end

> npm run start

6. Lancement des tests

Avec les lignes de commande données dessous, les mesures de couverture de tests sont mesurées.

   1. Tests front-end

   > npm run test:coverage

   2. Tests back-end

    > mvn test

   3. Tests end-to-end

   >  npx nyc --reporter=lcov --reporter=text-summary cypress run

## Utilisation

Après l'installation et le lancement du projet, l'application est accessible à l'adresse http://localhost:4200.
Il y a la possibilité de s'enregistrer ou de se logger en tant qu'admin pour effectuer les tests.
Les informations de l'admin sont déjà enregistrées dans la base de données.
Seuls les admins ont la possibilité créer des séances.
Pour participer à une séance, il est nécessaire de créer un utilisateur qui ne soit pas administrateur.

## Sécurité

- Utilisation de Spring Security
- Encryption des mots de passe dans la base de données