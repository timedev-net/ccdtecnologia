# Plano técnico

1. Adicionar os adaptadores oficiais do Payload para PostgreSQL e S3.
2. Selecionar o adaptador de banco conforme `DATABASE_URL`, preservando SQLite para desenvolvimento local.
3. Habilitar o plugin S3 somente quando todas as variáveis de MinIO estiverem presentes.
4. Habilitar a saída standalone do Next.js para o Dockerfile existente e usar Webpack no build, pois o Turbopack do Next 16 falha ao processar os estilos do admin do Payload.
5. Documentar todas as variáveis necessárias em `.env.example`.

O Coolify mantém Postgres e MinIO privados na rede do projeto. O DNS público será ligado após os registros Cloudflare apontarem para a VPS.
