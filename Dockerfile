FROM node:lts-alpine

ENV PORT=80 

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

RUN npm run build

COPY public/icons dist/icons

EXPOSE 80
CMD [ "npx", "ts-node", "index.ts" ]
