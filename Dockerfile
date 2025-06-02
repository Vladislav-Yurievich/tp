FROM node:18-alpine

WORKDIR /app

# Устанавливай зависимости 
COPY package*.json ./
RUN npm install

# Копируем все файлы проекта
COPY . .

# Открываем порт для Vite
EXPOSE 5173

# Команда запуска (лучше использовать напрямую npm)
CMD ["npm", "run", "dev"]