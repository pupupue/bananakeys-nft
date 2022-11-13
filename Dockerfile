FROM node:16 AS ui-build
WORKDIR /usr/src/app
COPY nft-frontend/ ./nft-frontend/
RUN cd nft-frontend && npm install && npm run build

FROM node:16 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/nft-frontend/out ./nft-frontend/out
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/server.ts ./api/

EXPOSE 3080

CMD ["node", "./api/server.js"]