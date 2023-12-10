FROM node:20

WORKDIR /app
# Custom cache invalidation
ARG CACHEBUST=$(date +%s)

COPY  .  .

RUN yarn install

EXPOSE 3000

CMD ["yarn","run", "start"]
