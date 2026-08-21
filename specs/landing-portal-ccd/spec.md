# Landing page e portal CCD Tecnologia

## Objetivo

Apresentar os serviços da CCD Tecnologia em uma landing page de alta conversão e permitir que clientes acessem, com segurança, os aplicativos contratados.

## Requisitos funcionais

- Exibir uma landing em pt-BR com navegação por âncoras, serviços, processo, diferenciais, formulário e CTA para o portal.
- Aplicar identidade escura com verde-limão e verde-esmeralda, usando as logos fornecidas.
- Exibir imagens remotas do Unsplash em camadas parallax e movimentos que respeitem `prefers-reduced-motion`.
- Carregar o widget de atendimento Chatwoot somente na landing pública.
- Iniciar em tema escuro por padrão, independentemente da preferência do sistema, e permitir alternância manual.
- Priorizar legibilidade com a paleta verde e roxa e imagens de reuniões de negócio e análise de dados.
- Manter o conteúdo do hero em uma coluna de leitura clara; imagens, partículas e painéis decorativos não podem disputar espaço com os CTAs ou com o texto principal.
- Exibir uma capa institucional da CCD Tecnologia nas prévias de compartilhamento, sem referências visuais ou textuais ao template do Payload.
- Usar a marca CCD como favicon, com versões adequadas para navegadores e dispositivos móveis.
- Exibir telefone/WhatsApp e e-mail de contato, com um CTA que inicia uma conversa no WhatsApp com mensagem preenchida.
- Autenticar usuários com o Payload; visitantes do portal devem ser enviados ao login.
- Permitir que administradores cadastrem aplicativos e os atribuam a clientes.
- Mostrar a cada cliente exclusivamente os aplicativos aos quais está vinculado.

## Critérios de aceite

- A rota `/` apresenta o conteúdo comercial, é responsiva e possui o CTA Área do Cliente.
- `/portal` exige sessão e mostra cards de aplicativos autorizados.
- Cliente não lê aplicativo de outro cliente pela Local API com controle de acesso ativo.
- Administrador pode administrar usuários e aplicativos pelo Payload.
- O HTML da homepage informa uma imagem Open Graph de 1200 × 630 px, logo branca e a frase “Soluções digitais que transformam negócios.”.
