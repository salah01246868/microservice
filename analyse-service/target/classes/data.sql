-- Initial Modeles
INSERT INTO modele (id, nom, type, version, date_entrainement, precision) VALUES (1, 'IA Irrigation v1', 'Random Forest', '1.0.0', '2026-01-10T10:00:00', 0.95);
INSERT INTO modele (id, nom, type, version, date_entrainement, precision) VALUES (2, 'Arrosage Optimal v2', 'Neural Network', '2.1.0', '2026-01-15T15:30:00', 0.98);

-- Initial Recommandations
INSERT INTO recommandation (id, parcelle_id, quantite_eau, justification, date_calcul) VALUES (1, 1, 150.5, 'Basé sur une humidité faible (25%)', '2026-01-16T21:10:00');
INSERT INTO recommandation (id, parcelle_id, quantite_eau, justification, date_calcul) VALUES (2, 2, 0.0, 'Humidité suffisante', '2026-01-16T21:15:00');
