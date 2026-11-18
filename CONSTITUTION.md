# Constitution — FrameFlow Studio

Este documento estabelece os princípios, as regras de governança, as responsabilidades humanas e os limites de atuação da inteligência artificial durante o desenvolvimento do **FrameFlow Studio**, projeto desenvolvido em dupla na disciplina DSAIA.

A Constituição orienta o desenvolvimento por meio da metodologia Spec-Driven Development (SDD), garantindo que as decisões importantes sejam tomadas pelos integrantes da dupla e que a inteligência artificial seja utilizada como ferramenta de apoio, sem substituir a responsabilidade humana.

---

## 1. Papéis e Responsabilidades

### 1.1. Aprovação de Especificações

Toda especificação de tela, entidade do banco de dados ou regra de negócio deverá ser analisada e aprovada explicitamente pelos dois integrantes da dupla antes de sua implementação.

O GitHub Copilot poderá sugerir ideias, estruturas e melhorias, mas não terá autonomia para aprovar ou modificar requisitos por conta própria.

### 1.2. Revisão e Aprovação de Código

Nenhum código poderá ser integrado à branch `main` sem revisão humana.

O fluxo de trabalho deverá seguir estas etapas:

1. Um integrante desenvolve uma funcionalidade em uma branch própria, com apoio da inteligência artificial.
2. O outro integrante revisa o código e verifica se ele atende aos requisitos aprovados.
3. A dupla realiza os testes necessários e aprova as alterações.
4. As alterações são integradas à branch `main`, preferencialmente por meio de Pull Request.

Os dois integrantes deverão participar tanto do desenvolvimento quanto da revisão, alternando responsabilidades sempre que possível.

### 1.3. Limites de Atuação da Inteligência Artificial

O GitHub Copilot atuará como ferramenta de assistência ao desenvolvimento, podendo:

- Sugerir e gerar trechos de código;
- Explicar conceitos e funcionalidades;
- Identificar possíveis erros;
- Sugerir melhorias na organização do código;
- Auxiliar na elaboração de testes e documentação.

Entretanto, o agente de IA não poderá aprovar especificações, tomar decisões de negócio ou executar alterações no GitHub sem autorização humana.

Nenhuma alteração será versionada automaticamente pela IA. Os comandos `git add`, `git commit` e `git push` serão executados exclusivamente por um integrante da dupla, após a conferência dos arquivos modificados.

### 1.4. Decisões Obrigatoriamente Humanas

As seguintes decisões deverão ser tomadas e aprovadas pelos dois integrantes:

1. Inclusão ou remoção de funcionalidades do escopo do MVP;
2. Criação ou alteração de tabelas e políticas de segurança (RLS) no Supabase;
3. Definição e aprovação dos critérios de aceite;
4. Aprovação das etapas do ciclo SDD;
5. Aprovação final das funcionalidades antes de sua integração à branch `main`.

---

## 2. Regras Inegociáveis do Projeto

### Regra 1 — Isolamento e Privacidade dos Dados

O FrameFlow Studio deverá garantir que cada fotógrafo tenha acesso somente aos próprios clientes, agendamentos e trabalhos.

Todas as tabelas que armazenarem dados associados aos fotógrafos deverão possuir um campo de identificação do usuário, como `user_id`, e políticas de Row Level Security (RLS) configuradas no Supabase.

As políticas deverão garantir que um usuário autenticado não consiga consultar, alterar ou excluir registros pertencentes a outra conta.

Toda criação ou alteração de tabelas e políticas de segurança deverá passar por revisão humana antes de ser aplicada.

### Regra 2 — Proteção de Credenciais e Variáveis de Ambiente

As credenciais e informações sensíveis utilizadas no projeto deverão ser protegidas.

As variáveis de ambiente deverão ser armazenadas em arquivos locais, como `.env.local`, que deverão permanecer protegidos pelo `.gitignore`.

A chave pública do Supabase (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) poderá ser utilizada no ambiente do navegador, desde que as políticas RLS estejam corretamente configuradas.

Chaves secretas, como a `service_role`, senhas e outros segredos nunca deverão ser expostos no código do navegador, enviados ao GitHub ou compartilhados em prompts com a inteligência artificial.

O projeto deverá utilizar um arquivo `.env.example` contendo apenas os nomes das variáveis necessárias, sem valores reais ou credenciais.

### Regra 3 — Fidelidade ao Escopo do MVP

O desenvolvimento deverá respeitar as funcionalidades aprovadas para a primeira versão do FrameFlow Studio.

O MVP terá como foco:

- Autenticação dos fotógrafos;
- Cadastro e gerenciamento de clientes;
- Cadastro e gerenciamento de agendamentos;
- Acompanhamento dos trabalhos fotográficos;
- Painel inicial com informações relevantes da rotina do fotógrafo.

A plataforma poderá ser utilizada por diferentes fotógrafos, cada um com sua própria conta e seus próprios dados.

Entretanto, funcionalidades de gestão de equipes e compartilhamento de dados entre funcionários de um mesmo estúdio não fazem parte do escopo inicial.

Também ficam fora do MVP:

- Módulo financeiro e controle de pagamentos;
- Upload, armazenamento e entrega de fotografias;
- Integração com WhatsApp;
- Aplicativo mobile independente;
- Gerenciamento de equipes e permissões compartilhadas.

Qualquer sugestão de funcionalidade fora desse escopo deverá ser discutida e aprovada pelos dois integrantes antes de entrar no planejamento.

### Regra 4 — Fidelidade à Metodologia SDD

O projeto deverá seguir o fluxo de Spec-Driven Development:

**Specify → Plan → Tasks → Implement**

Nenhuma funcionalidade deverá ser implementada antes que sua especificação, seu planejamento e suas tarefas estejam documentados e aprovados pelos dois integrantes.

O GitHub Copilot poderá auxiliar em todas as etapas, mas não poderá modificar requisitos aprovados ou iniciar implementações fora do planejamento autorizado.

Alterações nos requisitos deverão passar novamente pela aprovação da dupla e ser registradas na documentação do projeto.

### Regra 5 — Organização e Qualidade do Código

O código deverá seguir padrões de organização, legibilidade e consistência.

Deverão ser adotadas as seguintes práticas:

- Utilização de TypeScript no desenvolvimento;
- Organização dos componentes e arquivos de forma clara;
- Nomes de variáveis e funções que representem suas responsabilidades;
- Reutilização de componentes quando apropriado;
- Evitar duplicação desnecessária de código;
- Comentários apenas quando ajudarem a compreender partes importantes da implementação.

O código gerado pela inteligência artificial deverá ser compreendido e revisado pelos integrantes antes de ser aprovado.

---

## 3. Critérios de Pronto — Definition of Done

Uma funcionalidade somente será considerada concluída quando atender a todos os critérios abaixo:

1. **Conformidade com a especificação:** a funcionalidade atende aos requisitos documentados e aprovados pela dupla.

2. **Funcionamento local:** a aplicação executa corretamente por meio do comando `npm run dev`, sem erros que impeçam o funcionamento da funcionalidade.

3. **Qualidade da compilação:** o projeto executa o comando `npm run build` sem erros de compilação.

4. **Testes funcionais:** os integrantes realizam testes manuais do fluxo principal da funcionalidade, verificando se os resultados correspondem ao comportamento esperado.

5. **Segurança dos dados:** quando houver operações com dados de usuários, deverá ser verificado se cada fotógrafo consegue acessar somente seus próprios registros.

6. **Revisão humana:** o código deverá ser analisado e aprovado pelos integrantes antes de sua integração à branch `main`.

7. **Versionamento:** as alterações deverão estar registradas no GitHub, com mensagens de commit claras e descritivas.

8. **Documentação:** quando necessário, a documentação deverá ser atualizada para refletir as alterações realizadas.

---

## 4. Princípio Fundamental

O FrameFlow Studio será desenvolvido com a inteligência artificial como ferramenta de apoio, e não como substituta do conhecimento e das decisões humanas.

Os integrantes da dupla serão responsáveis por compreender, revisar, testar e aprovar tudo o que for implementado.

A prioridade será construir uma aplicação funcional, segura, organizada e coerente com o escopo definido, respeitando as etapas da metodologia SDD e os objetivos da disciplina DSAIA.

**A decisão final sobre o projeto sempre pertencerá aos integrantes da dupla.**