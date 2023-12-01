# 1. For build React app
FROM node:20-alpine3.17 AS deveopment

# set working directory
WORKDIR /app
#
COPY package*.json ./

# Same as npm install
RUN npm ci

COPY . /app

ENV CI=true
ENV PORT=3000

CMD ["npm", "start"]

FROM deveopment AS build

RUN npm run build

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git 
EOF
RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

# 2. For Nginx setup
FROM nginx:1.24.0-alpine

# Copy config nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]