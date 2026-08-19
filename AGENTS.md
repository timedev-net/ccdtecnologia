# Guia para agentes

## Contexto do projeto

Este é um site com CMS construído com:

- Next.js 16 e React 19;
- Payload CMS 3.88 com adaptador SQLite;
- TypeScript 5 em modo `strict`;
- Tailwind CSS 4 para estilos;
- Lucide React para ícones;
- Vitest para testes de integração e Playwright para testes end-to-end.

O código-fonte está em `src/`. O frontend fica em `src/app/(frontend)/`, a integração do Payload em `src/app/(payload)/`, e a configuração central do CMS em `src/payload.config.ts`.

## Skill do Payload

Use a skill local do Payload ao alterar configurações, collections, fields, hooks, access control, endpoints ou a API do CMS:

1. Leia `.agents/skills/payload/SKILL.md`.
2. Consulte `.agents/skills/payload/reference/` quando precisar de detalhes.

## Ambiente e comandos

Use exclusivamente `pnpm` para instalar dependências e executar scripts. Não use `npm`, `yarn` ou `bun` neste repositório.

| Objetivo | Comando |
| --- | --- |
| Desenvolvimento | `pnpm dev` |
| Lint | `pnpm lint` |
| Corrigir lint | `pnpm lint:fix` |
| Testes de integração | `pnpm test:int` |
| Testes end-to-end | `pnpm test:e2e` |
| Suíte completa | `pnpm test` |
| Build de produção | `pnpm build` |
| Gerar tipos do Payload | `pnpm generate:types` |
| Gerar import map do Payload | `pnpm generate:importmap` |

Não instale dependências, altere configurações de build ou gere arquivos rastreados sem que a mudança seja necessária para o recurso solicitado.

## TypeScript e qualidade de código

- Preserve `strict: true` no TypeScript.
- Não use `any`, explícito ou implícito. Use `unknown` nas fronteiras não confiáveis e faça narrowing com type guards antes do uso.
- Declare tipos explícitos em fronteiras do sistema, como entrada e saída de endpoints, props públicas, dados externos e contratos de use-cases.
- Use os tipos gerados em `src/payload-types.ts` para documentos e dados do Payload. Após mudanças de schema, execute `pnpm generate:types` e inclua o resultado quando ele mudar.
- Prefira funções pequenas, coesas e com nomes que expressem a intenção. Evite duplicação, acoplamento entre domínios e abstrações sem uso concreto.
- Valide e normalize dados não confiáveis na fronteira da aplicação; nunca confie em dados enviados pelo cliente.

## Arquitetura

Para recursos novos e alterações relevantes, organize o código por módulo de domínio em `src/modules/<dominio>/`:

```txt
src/modules/<dominio>/
├── domain/          # Entidades, regras e contratos puros do domínio
├── application/     # Use-cases e services que orquestram regras de negócio
├── infrastructure/  # Repositórios, Payload, persistência e integrações externas
└── presentation/    # Controllers, rotas, DTOs e adaptadores de entrada/saída
```

- Aplique Clean Architecture com dependências apontando para dentro: `presentation` e `infrastructure` dependem de `application` e `domain`; `domain` não depende de frameworks.
- Controllers, rotas do Next.js e endpoints do Payload são adaptadores finos: recebem e validam a entrada, chamam um use-case/service e mapeiam a resposta. Eles não contêm regras de negócio.
- Regras de negócio, decisões de fluxo e orquestração pertencem a `application/` (services/use-cases); regras puras pertencem a `domain/`.
- Não há obrigação de refatorar o template existente. A estrutura modular é obrigatória para código novo e mudanças relevantes.

## Payload, dados e migrations

- Não altere, remova ou reescreva migrations existentes. Crie uma nova migration somente quando a alteração de schema exigir uma.
- Ao usar a Local API do Payload em nome de um usuário, passe `overrideAccess: false` para que o access control seja aplicado.
- Em operações aninhadas de hooks, repasse `req` para manter a transação; use flags em `req.context` para impedir loops de hooks.
- Preserve regras de acesso restritivas por padrão e teste permissões ao criar ou alterar recursos protegidos.
- Use pt-BR com ortografia e acentuação corretas em textos de interface, mensagens, labels e seeds de banco de dados.

## Interface

- Prefira Tailwind CSS para estilos. Use CSS/SCSS apenas quando Tailwind não for suficiente ou quando for necessário manter um padrão já existente.
- Prefira ícones de `lucide-react`; não introduza bibliotecas de ícones adicionais sem necessidade.
- Preserve responsividade, acessibilidade semântica, estados de carregamento, vazio e erro quando aplicáveis.

## Desenvolvimento orientado a especificações

Antes de implementar um novo recurso ou mudança de escopo relevante, crie ou atualize sua documentação em `specs/<recurso-em-kebab-case>/`:

- `spec.md`: objetivo, escopo, requisitos funcionais, fluxos, critérios de aceite e casos de erro.
- `plan.md`: decisões técnicas, módulos afetados, fluxo de dados, contratos e estratégia de testes.
- `tasks.md`: tarefas pequenas, ordenadas, marcáveis e vinculadas aos critérios de aceite.

Siga o fluxo: especificação → plano → tarefas → implementação. Mantenha esses arquivos atualizados quando os requisitos, decisões técnicas ou tarefas mudarem. Não instale o Spec Kit: este projeto adota o processo de forma nativa em Markdown.

## Testes e verificação

- Escreva ou atualize testes proporcionais à mudança, cobrindo fluxos principais, casos de erro e regressões plausíveis.
- Rode ao menos os comandos diretamente relacionados à alteração. Para uma feature concluída, rode `pnpm lint` e a suíte de testes aplicável.
- Execute `pnpm test:int` ao alterar dados, Payload, use-cases, serviços, endpoints ou regras de acesso.
- Execute `pnpm test:e2e` ao alterar fluxos de interface, rotas do frontend ou comportamentos no admin.
- Execute `pnpm test` quando a mudança afetar mais de uma camada ou antes de considerar uma feature concluída.
- Informe no handoff final quais comandos foram executados e qualquer verificação que não pôde ser realizada.
