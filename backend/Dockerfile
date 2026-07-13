# Multi-stage Dockerfile untuk Production Backend

# Stage 1: Build
FROM node:20-alpine AS builder

# Set workdir
WORKDIR /app

# Salin package json
COPY package*.json ./

# Install dependensi (termasuk devDep yang butuh typescript dll)
RUN npm install

# Salin seluruh kode proyek
COPY . .

# Build TS ke JS di folder /dist
RUN npm run build

# Stage 2: Production Run
FROM node:20-alpine

WORKDIR /app

# Salin package json
COPY package*.json ./

# HANYA install production dependencies agar image ringan
RUN npm install --production

# Salin file hasil build dari Stage 1
COPY --from=builder /app/dist ./dist

# Ekspos port 5000
EXPOSE 5000

# Ubah env menjadi production
ENV NODE_ENV=production

# Jalankan index.js hasil build
CMD ["node", "dist/index.js"]
