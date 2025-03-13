# Projet NO-SQL DATA SCIENCES MASTER 2

## Prérequis

Avant de commencer, assurez-vous que les éléments suivants sont installés sur votre machine :

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows)
- Git (optionnel, pour cloner le projet si nécessaire)

## Installation et Lancement

### 1. Cloner le projet
Si votre projet est versionné avec Git, clonez-le en utilisant :
```sh
git clone https://github.com/MaestrosR25/m2-data-science-2025.git
cd fsentinelle
```


### 2. Démarrer les services avec Docker Compose

Assurez-vous que Docker Desktop est en cours d'exécution, puis exécutez la commande suivante :

```sh
docker compose up -d --build
```

### 3. Vérifier les conteneurs en cours d'exécution

Pour voir les conteneurs en cours d'exécution, utilisez :
```sh
docker ps
```

## Accès aux services

- **MongoDB** : L'instance MongoDB est exécutée en interne et utilisée par le backend.
- **Mongo Express** : Interface d'administration MongoDB accessible via [http://localhost:8081](http://localhost:8081)
- **Backend** : Disponible sur [http://localhost:8083](http://localhost:8083)
- **Frontend** : Accessible sur [http://localhost:3000](http://localhost:3000)

## Gestion des Conteneurs

### Arrêter les services
```sh
docker compose down
```

### Supprimer les conteneurs et les volumes (optionnel)
```sh
docker compose down -v
```

### Nettoyer les images et volumes Docker (optionnel)
```sh
docker system prune -a
```

## Développement

Si vous souhaitez développer en direct sans reconstruire les images à chaque modification, vous pouvez utiliser les volumes montés pour que les changements soient reflétés automatiquement dans les conteneurs.

### Rebuild après modification
```sh
docker compose up -d --build
```

## Notes
- Le réseau Docker "sn-project" est utilisé pour connecter tous les services.
- Assurez-vous que le port 3000 (Frontend), 8083 (Backend) et 8081 (Mongo Express) ne sont pas déjà utilisés sur votre machine.

---
**Bonne utilisation du projet NO-SQL DATA SCIENCES MASTER 2 !** 🚀

