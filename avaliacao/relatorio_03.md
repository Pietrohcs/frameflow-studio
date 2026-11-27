# Relatório — FrameFlow Studio — semana 3

## Viabilidade

- Grupo: Dupla 02
- Integrantes: Pietro Henrique Camargo Siqueira e Queren Hapuque
- Specify: https://github.com/Pietrohcs/frameflow-studio/blob/main/specs/001-authentication-clients/spec.md
- Plan: https://github.com/Pietrohcs/frameflow-studio/blob/main/specs/001-authentication-clients/plan.md
- Tasks: https://github.com/Pietrohcs/frameflow-studio/blob/main/specs/001-authentication-clients/tasks.md
- Veredito: O PDF e as tarefas recortam conta e clientes. A spec na `main` não.

Os três arquivos abrem. A spec está em rascunho, criada em 18/11/2026. As histórias 1 a 3 e os FR-001 a FR-016 cobrem página inicial com Entrar e Criar Conta, cadastro, login, logout e CRUD de clientes com `user_id` e RLS. Nome em branco é recusado (FR-010). As histórias 4 a 6 e os FR-017 a FR-028 entram na mesma spec, todas em P1: trabalhos com descrição obrigatória, agendamentos com data e hora, e status em seis estados (Solicitado, Agendado, Em Andamento, Concluído, Entregue, Cancelado). Fora do escopo ficam métricas de painel, pagamento, upload, WhatsApp, aplicativo e equipe. Agenda e status não estão fora.

O plano contradiz essa spec. Nas restrições, ele proíbe agendamento, status de trabalho e painel. As tarefas T012 a T039 estão abertas e só cobrem landing, conta e clientes. A T039 manda a interface ficar nessas três rotas. T001 a T011 estão marcadas, e isso é a semana 4.

## SWOT

### Forças

O nome da pasta combina com conta e clientes. O plano e o `tasks.md` repetem o recorte do PDF: sem agenda, sem status, sem painel. O critério de cliente isolado está na spec e nas tarefas de RLS.

### Fraquezas

A spec trata agenda, trabalho e status como prioridade desta iteração. O PDF da semana 3 diz o contrário, e o plano também. Quem implementar pela spec constrói outro produto do que quem implementar pelas tarefas.

### Oportunidades

Cortar as histórias 4 a 6 e os FR-017 a FR-028 desta spec, ou abrir outra pasta `specs/` para trabalhos e agenda. As tarefas até a T032 já bastam para conta e carteira.

### Ameaças

A semana 4 seguir a spec e entregar agenda, ou seguir as tarefas e declarar a spec cumprida. Os dois resultados não fecham o mesmo “pronta”.

## Stack técnica

**Parecer: Sem mudança, e o plano confirma a stack.** TypeScript, Next.js (App Router), React, Tailwind, Supabase Auth e PostgreSQL com RLS. O plano repete a proibição de segredo no browser e de biblioteca fora dessa lista.

## Recomendação

**Façam a spec caber no `tasks.md`: landing, conta e clientes, sem trabalho, agenda ou status.**

O fotógrafo cria a conta e mexe só na própria carteira. Trabalho, agenda e status, se continuarem na constitution como MVP, ficam numa spec seguinte. O painel de métricas já está fora do escopo desta spec.
