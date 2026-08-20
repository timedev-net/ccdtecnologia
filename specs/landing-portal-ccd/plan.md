# Plano técnico

- Landing curada em código, isolada em componentes de `src/components/Landing`.
- Interações client-side usam APIs nativas do navegador e Tailwind/CSS, sem novas dependências.
- O módulo `src/modules/portal` separa o contrato de aplicativo, consulta Payload e a apresentação do portal.
- `users.role` é salvo no JWT; `applications.clients` estabelece a autorização por relacionamento.
- A consulta do portal passa o usuário autenticado e `overrideAccess: false` ao Payload.
