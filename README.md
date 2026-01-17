# AquaOptimize - Aide à la Décision pour Irrigation Optimisée

## Description
AquaOptimize est une solution logicielle complète basée sur une architecture microservices pour optimiser l'irrigation agricole grâce à l'intelligence artificielle. Le système collecte des données de capteurs en temps réel, les analyse via des modèles IA et génère des recommandations d'irrigation précises.

## Architecture
- **Microservice Collecte** : Gère les capteurs et les observations.
- **Microservice Analyse** : Gère les modèles IA et génère des recommandations (Communique avec Collecte via Kafka et Feign).
- **Service Discovery** : Eureka pour l'enregistrement et la découverte des services.
- **Config Server** : Centralisation de la configuration.
- **Gateway** : Point d'entrée unique pour le frontend.
- **Frontend** : Application Angular moderne avec Glassmorphism.

## Technologies Utilisées
- **Back-end** : Java 17, Spring Boot 3.2, Spring Cloud, Spring Data JPA, Kafka, Feign, Eureka.
- **Front-end** : Angular 17.
- **Bases de données** : H2 (In-memory pour demo).
- **DevOps** : Docker, Docker Compose, Kubernetes.

## Installation et Exécution

### Prérequis
- Docker et Docker Compose
- Maven (pour compiler en local si besoin)
- Node.js & npm (pour le frontend en local)

### Exécution avec Docker Compose
1. Clonez le repository.
2. Compilez les projets Spring Boot :
   ```bash
   ./mvnw clean package -DskipTests
   ```
3. Démarrez l'infrastructure et les services :
   ```bash
   docker-compose up --build
   ```
4. Accédez à l'application :
   - Frontend : `http://localhost:80`
   - Gateway : `http://localhost:8887`
   - Eureka : `http://localhost:8761`

### Script de Simulation
Un script est disponible pour simuler l'envoi de données et vérifier le flux microservices :
```bash
./simulate-data.sh
```
*(Note : nécessite que les services soient démarrés via Docker Compose ou localement)*

## Structure du Repository
- `collecte-service/` : Code source microservice collecte.
- `analyse-service/` : Code source microservice analyse.
- `discovery-service/` : Service de découverte Eureka.
- `config-service/` : Serveur de configuration.
- `gateway-service/` : API Gateway.
- `angular-frontend/` : Application Angular.
- `docker-k8s/` : Dockerfiles et templates Kubernetes.
- `docker-compose.yml` : Fichier d'orchestration.
