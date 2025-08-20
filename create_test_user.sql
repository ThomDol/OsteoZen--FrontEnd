-- Script pour créer un utilisateur de test
-- Base de données: gestion_patient_appuser

-- 1. Insérer un lieu (ville)
INSERT INTO lieu (id_ville, nom_ville, code_postal) VALUES (1, 'Paris', '75000');

-- 2. Insérer un rôle
INSERT INTO role (id_role, nom_role) VALUES (1, 'ADMIN');

-- 3. Insérer une personne (identité)
INSERT INTO personne (id_identite, nom, prenom, email, telephone, date_naissance, genre, id_ville) 
VALUES (1, 'Admin', 'Test', 'admin@test.com', '0123456789', '1990-01-01', 'M', 1);

-- 4. Insérer un utilisateur
INSERT INTO appuser (id_appuser, id_identite, is_active, adeli, password, id_role, id_ville) 
VALUES (1, 1, 1, 'ADELI123', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1);

-- Note: Le mot de passe hashé correspond à "password"
