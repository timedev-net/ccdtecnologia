# Deploy de produção no Coolify

## Objetivo

Executar o website CCD Tecnologia no projeto `website` do Coolify com PostgreSQL e armazenamento de mídia compatível com MinIO.

## Requisitos

- A aplicação usa PostgreSQL quando `DATABASE_URL` for uma URL PostgreSQL.
- Os uploads da collection `media` usam API S3 quando as variáveis do MinIO estiverem configuradas.
- O desenvolvimento local continua usando SQLite e armazenamento local.
- A imagem Docker produzida pelo repositório é compatível com o modo standalone do Next.js.
- Segredos de produção são fornecidos exclusivamente por variáveis do Coolify.

## Critérios de aceite

- TypeScript e lint passam.
- A imagem pode ser criada pelo Coolify usando o Dockerfile do repositório.
- Não há credenciais versionadas.
