# Utiliser l'image officielle de Node.js
FROM node:16

# Créer le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copier les fichiers 'package.json' et 'package-lock.json'
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier les fichiers et dossiers du projet dans l'image Docker
COPY . .

# Exposer le port que votre app utilise
EXPOSE 3000

# Lancer l'application
CMD ["node", "app.js"]
