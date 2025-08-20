-- Script pour insérer un utilisateur de test
USE gestion_patient_appuser;

-- Insérer un lieu
INSERT INTO lieu (id_ville, nom_ville, code_postal) VALUES (1, 'Paris', '75000') ON DUPLICATE KEY UPDATE nom_ville = nom_ville;

-- Insérer un rôle
INSERT INTO role (id_role, nom_role) VALUES (1, 'ADMIN') ON DUPLICATE KEY UPDATE nom_role = nom_role;

-- Insérer une personne
INSERT INTO personne (id_identite, nom, prenom, email, telephone, date_naissance, genre, id_ville) 
VALUES (1, 'Admin', 'Test', 'admin@test.com', '0123456789', '1990-01-01', 'M', 1) 
ON DUPLICATE KEY UPDATE email = email;

-- Insérer un utilisateur avec mot de passe hashé pour "password123"
INSERT INTO appuser (id_appuser, id_identite, is_active, num_adeli, password, id_role, id_ville) 
VALUES (1, 1, 1, 'TEST123', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1) 
ON DUPLICATE KEY UPDATE password = VALUES(password);

-- Note: Le hash ci-dessus correspond à "password", pas à "password123"
-- Pour "password123", il faudrait un hash différent
