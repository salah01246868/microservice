-- Initial Capteurs
INSERT INTO capteur (id, type, parcelle_id, emplacement) VALUES (1, 'HUMIDITE', 1, 'Zone Nord');
INSERT INTO capteur (id, type, parcelle_id, emplacement) VALUES (2, 'TEMPERATURE', 1, 'Zone Nord');
INSERT INTO capteur (id, type, parcelle_id, emplacement) VALUES (3, 'LUMINOSITE', 2, 'Zone Sud');

-- Initial Observations
INSERT INTO observation (id, capteur_id, valeur, unite, timestamp) VALUES (1, 1, 25.5, '%', '2026-01-16T21:00:00');
INSERT INTO observation (id, capteur_id, valeur, unite, timestamp) VALUES (2, 2, 22.0, '°C', '2026-01-16T21:00:00');
INSERT INTO observation (id, capteur_id, valeur, unite, timestamp) VALUES (3, 3, 500.0, 'lux', '2026-01-16T21:00:00');
