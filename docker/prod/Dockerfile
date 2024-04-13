FROM node:latest AS base

ENV projectDir /app

WORKDIR $projectDir
COPY package.json .
COPY tsconfig.json .

FROM base AS builder
WORKDIR $projectDir
ADD src $projectDir/src
ADD res $projectDir/src
RUN npm run build

FROM base as runner
WORKDIR $projectDir
COPY --from=builder $projectDir/node_modules $projectDir/node_modules
COPY --from=builder $projectDir/dist $projectDir/dist
ENTRYPOINT node $projectDir/dist/index.js
