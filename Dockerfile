# 构建阶段
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
RUN cp -R node_modules /tmp/
COPY --from=build /app/build ./build
COPY server.js .
COPY db.json .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
EXPOSE 13000
ENTRYPOINT ["./entrypoint.sh"]