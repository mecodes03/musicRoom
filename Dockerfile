FROM node:20

WORKDIR /app

COPY . .

RUN npm install -g pnpm 

RUN pnpm install
RUN pnpm db:generate
RUN pnpm db:migrate
RUN pnpm db:push

EXPOSE 3000

CMD ["pnpm", "dev"]
