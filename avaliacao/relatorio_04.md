# Relatório — FrameFlow Studio — semana 4

## Viabilidade

- Grupo: Dupla 02
- Integrantes: Pietro Henrique Camargo Siqueira e Queren Hapuque
- Repositório: https://github.com/Pietrohcs/frameflow-studio
- Evidência: commit `a6c4743` (T001–T002), pull requests 1, 2 e 3, os três mesclados na `main`
- Veredito: Atende o setup rastreável. Conta e clientes ainda não estão na tela.

O commit `a6c4743321a12da05359737d6844fbccdd74e4d8` abre. A mensagem é T001 e T002: Next.js, TypeScript, Tailwind e dependências. Os arquivos incluem `package.json`, `app/layout.tsx`, `app/globals.css` e um `app/page.tsx`. O pull request 1 está mesclado e traz T003 a T005: layout, `.env.example`, `.gitignore` e `types/client.ts`. O pull request 2 está mesclado e traz T006 a T010: `lib/supabase/client.ts`, `lib/supabase/server.ts` e `supabase/migrations/202611190001_create_clients.sql`. O pull request 3 está mesclado e altera `lib/supabase/server.ts` para o redirecionamento da T011. No `tasks.md`, T001 a T011 estão marcadas. T012 em diante continuam abertas.

A tabela `clients` tem `user_id`, nome obrigatório e as quatro políticas RLS de select, insert, update e delete com `auth.uid()`. A página na `main` mostra o título FrameFlow Studio e uma frase. Não há botões Entrar e Criar Conta, nem rotas de cadastro, login ou clientes. Não há `app/signup`, `app/login` nem `app/clients`.

## SWOT

### Forças

A trilha pedida existe no GitHub: tarefa, commit ou pull request mesclado, e o arquivo na `main`. A dupla não chama a aplicação de pronta. A migração cobre o isolamento que a constitution e a spec pedem para clientes.

### Fraquezas

O resultado da semana 3, conta e carteira, não tem tela. A página inicial não cumpre o FR-001. O commit inicial já gravou `app/page.tsx`, e o PDF tinha atribuído o layout só ao pull request 1. A revisão descrita no PDF nomeia o pull request 1; os pull requests 2 e 3 estão mesclados, sem o mesmo relato de leitura.

### Oportunidades

A T013 em diante já aponta os arquivos que faltam: `app/page.tsx` com as duas ações, `app/signup`, `app/login` e `app/clients`. A tabela e o helper de sessão estão na `main`.

### Ameaças

Marcar US2 e US3 como feitos porque a migração e o redirecionamento existem. A árvore da `main` não tem essas telas. Seguir as histórias 4 a 6 da spec nesta semana traz agenda e status para fora do `tasks.md`.

## Stack técnica

**Parecer: Sem mudança em relação ao plano.** Na `main` estão Next.js, React, TypeScript, Tailwind e o cliente Supabase. O README ainda diz Cursor; o PDF desta semana diz Visual Studio Code com Copilot em modo Agent. A linguagem e o banco não mudaram.

## Recomendação

**Sigam da T013 à T032: landing com os dois botões, conta e CRUD de clientes, sem trabalho nem agenda.**

O setup está na `main`, com a tabela `clients` e o RLS. O fotógrafo ainda não cadastra a conta nem a carteira.
