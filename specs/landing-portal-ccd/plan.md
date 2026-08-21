# Plano técnico

- Landing curada em código, isolada em componentes de `src/components/Landing`.
- Interações client-side usam APIs nativas do navegador e Tailwind/CSS, sem novas dependências.
- O SDK do Chatwoot é carregado após a interatividade por `next/script`, evitando bloquear a primeira renderização e sem incluí-lo no portal autenticado.
- A preferência inicial do tema é `dark`; somente uma escolha explícita persistida pode substituir esse padrão.
- A composição visual usa uma camada de contraste sobre fotos de negócios e dados, além de acentos complementares em roxo.
- O módulo `src/modules/portal` separa o contrato de aplicativo, consulta Payload e a apresentação do portal.
- `users.role` é salvo no JWT; `applications.clients` estabelece a autorização por relacionamento.
- A consulta do portal passa o usuário autenticado e `overrideAccess: false` ao Payload.
