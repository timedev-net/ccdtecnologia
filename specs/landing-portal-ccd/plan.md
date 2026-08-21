# Plano técnico

- Landing curada em código, isolada em componentes de `src/components/Landing`.
- Interações client-side usam APIs nativas do navegador e Tailwind/CSS, sem novas dependências.
- O SDK do Chatwoot é carregado após a interatividade por `next/script`, evitando bloquear a primeira renderização e sem incluí-lo no portal autenticado.
- A preferência inicial do tema é `dark`; somente uma escolha explícita persistida pode substituir esse padrão.
- A composição visual usa uma camada de contraste sobre fotos de negócios e dados, além de acentos complementares em roxo.
- No hero desktop, a coluna editorial ocupa a esquerda e os elementos decorativos ficam limitados à direita; em telas menores, os elementos secundários são reduzidos para preservar a leitura.
- Uma capa social estática em `public/og/` usa fundo gerado, logo local e texto composto de forma determinística; os metadados e fallbacks de Open Graph apontam para ela.
- Favicons rasterizados derivam da logo branca, sobre fundo escuro da marca, em ICO e PNG; o layout referencia as versões corretas por tamanho.
- O módulo `src/modules/portal` separa o contrato de aplicativo, consulta Payload e a apresentação do portal.
- `users.role` é salvo no JWT; `applications.clients` estabelece a autorização por relacionamento.
- A consulta do portal passa o usuário autenticado e `overrideAccess: false` ao Payload.
