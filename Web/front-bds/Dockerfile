# Utiliser une image Node.js comme étape de construction pour construire le projet
FROM node:16 as build-stage

# Définir le répertoire de travail
WORKDIR /app

# Copier 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers et dossiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Utiliser Nginx pour servir le contenu statique
FROM nginx:stable-alpine as production-stage

# Copier le contenu statique du stade de construction
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exposer le port utilisé par Nginx
EXPOSE 5173

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
