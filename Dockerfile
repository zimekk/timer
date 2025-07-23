FROM node:20.10.0-alpine3.17 AS base

# https://stackoverflow.com/questions/68996420/how-to-set-timezone-inside-alpine-base-docker-image
# https://docs.diladele.com/docker/timezones.html
ENV TZ=Europe/Warsaw

ENV WORKDIR=/app

# https://pnpm.io/docker#example-3-build-on-cicd
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

FROM base AS prod
WORKDIR $WORKDIR
COPY pnpm-lock.yaml .
# RUN pnpm fetch --prod
RUN pnpm fetch

COPY . .
RUN pnpm install --offline --config.ignore-scripts=true
# RUN pnpm build
# RUN pnpm prune --prod --config.ignore-scripts=true

WORKDIR $WORKDIR/apps/app
CMD ["pnpm", "dev"]

# FROM base
# WORKDIR $WORKDIR
# # COPY --from=prod /app/node_modules /app/node_modules
# # COPY --from=prod /app/dist /app/dist
# COPY --from=prod $WORKDIR .

# CMD ["pnpm", "preview"]
