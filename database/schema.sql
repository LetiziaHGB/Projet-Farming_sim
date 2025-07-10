CREATE DATABASE IF NOT EXISTS ferme_db;
USE ferme_db;

-- Table des champs agricoles
CREATE TABLE champs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lot_id INT,
  etat ENUM('récolté', 'labouré', 'semé', 'fertilisé', 'prêt'),
  culture VARCHAR(50),
  date_semis DATETIME
);

-- Cultures disponibles
CREATE TABLE cultures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50),
  rendement INT,
  machines_requises TEXT
);

-- Machines agricoles
CREATE TABLE machines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50),
  disponible BOOLEAN DEFAULT TRUE
);

-- Stockage
CREATE TABLE stockage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type_produit VARCHAR(50),
  quantite INT
);

-- Usines de transformation
CREATE TABLE usines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  intrants TEXT,
  produit_sortie VARCHAR(50),
  multiplicateur INT
);

-- Historique de production
CREATE TABLE historique (
  id INT AUTO_INCREMENT PRIMARY KEY,
  horodatage DATETIME DEFAULT CURRENT_TIMESTAMP,
  action VARCHAR(50),
  quantite INT,
  or_gagne INT
);
