# Multi-stage Dockerfile untuk Production Frontend

# Stage 1: Builder
FROM node:20-alpine AS builder

# Set workdir
WORKDIR /app

# Salin config dependencies
COPY package*.json ./

# Install dependencies (termasuk devDependencies karena Vite butuh untuk build)
RUN npm install

# Salin sisa kode proyek
COPY . .

# Build Vite React App
RUN npm run build

# Stage 2: Serve Web dengan Nginx
FROM nginx:alpine

# Hapus default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Salin static assets hasil build dari Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Salin Nginx config (SPA routing dan proxy API)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Buka port 80
EXPOSE 80

# Mulai Nginx
CMD ["nginx", "-g", "daemon off;"]
