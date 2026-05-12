# Geopick web — Railway deployment image
# Mirrors the cozyfit frontend pattern: Node 20 alpine + npm ci + next build.
FROM node:20-alpine
WORKDIR /app

# Install deps from lockfile for reproducibility.
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build the Next.js app.
COPY . .
RUN npm run build

# Railway injects PORT — Next.js 15 reads it automatically.
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
