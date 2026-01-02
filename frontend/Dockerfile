FROM node:20

WORKDIR /app

# On copie les fichiers de dépendances
COPY package*.json ./
RUN npm install

# On copie le reste du code
COPY . .

# Exposer le port par défaut de Vite
EXPOSE 5173

# Lancer Vite avec l'option --host pour accepter les connexions externes
CMD ["npm", "run", "dev", "--", "--host"]