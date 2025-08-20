-- Mettre à jour le mot de passe pour "password" (hash BCrypt)
UPDATE gestion_patient_appuser.appuser 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
WHERE id_appuser = 1;
