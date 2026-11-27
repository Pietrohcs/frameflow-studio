# Relatório — FrameFlow Studio — semana 2

## Viabilidade

- Grupo: Dupla 02
- Integrantes: Pietro Henrique Camargo Siqueira e Queren Hapuque
- Repositório: https://github.com/Pietrohcs/frameflow-studio
- Constitution: https://github.com/Pietrohcs/frameflow-studio/blob/main/.specify/memory/constitution.md
- Veredito: Atende

O arquivo abre na `main` e é o caminho do PDF, não a raiz. Os dois aprovam spec de tela, entidade e regra de negócio antes da implementação. Um desenvolve na branch, o outro revisa, e a integração na `main` é por pull request. O Copilot não aprova spec, não decide negócio e não executa `git add`, `commit` nem `push`. O “pronta” está no arquivo: conformidade com a spec, `npm run dev`, `npm run build`, teste manual, cada fotógrafo só nos próprios registros, revisão humana, commit descritivo e documentação quando a mudança pedir.

## SWOT

### Forças

As regras do PDF estão no arquivo. Tabela de fotógrafo leva `user_id` e RLS revista por humano. A chave anônima pública pode ir ao navegador; `service_role` e senha ficam fora do Git, do código de browser e do prompt, com nomes só no `.env.example`. Função fora do planejamento aprovado não entra pelo Copilot. Há ainda regra de TypeScript, nome claro e revisão do código gerado.

### Fraquezas

O MVP escrito na constitution inclui autenticação, clientes, agendamentos, acompanhamento dos trabalhos e painel inicial. O PDF da semana 3 tira agenda, status e painel desta iteração. A constitution não faz esse corte.

### Oportunidades

A spec pode declarar o que desta lista é a iteração 1 e o que fica no MVP para depois. O critério 5 já pede a prova de que um fotógrafo não lê o registro do outro.

### Ameaças

Implementar agenda e painel porque a constitution os chama de MVP, enquanto o `tasks.md` ainda não os lista. Ou o inverso: tratar a constitution como se ela tivesse tirado a agenda, quando o texto a mantém.

## Stack técnica

**Parecer: Sem mudança de linguagem.** Continuam TypeScript, Next.js e Supabase. A constitution fixa TypeScript, RLS e o par `.env.local` / `.env.example`. Não tira o Copilot do apoio ao código.

## Recomendação

**Mantenham o agente fora do Git e escrevam na próxima spec o que do MVP entra agora.**

Os dois aprovam a spec. Um revisa o pull request do outro. Segredo não entra no repositório, e política de RLS não entra sem revisão humana.
