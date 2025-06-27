########## Build stage ##########
FROM node:18-alpine AS build
WORKDIR /app

# 1. Yalnızca manifest dosyalarını kopyala
COPY package.json package-lock.json* ./

# 2. Lock varsa npm ci, yoksa npm install
RUN if [ -f package-lock.json ]; \
      then npm ci --omit=dev; \
      else npm install --omit=dev; \
    fi

########## Runtime stage ##########
FROM node:18-alpine
WORKDIR /app

# 3. node_modules klasörünü build layer’dan al
COPY --from=build /app/node_modules ./node_modules

# 4. Kaynak kodu kopyala
COPY . .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]


# tr -d '\n' < serviceAccountKey.json