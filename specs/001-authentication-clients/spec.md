# Feature Specification: Autenticação e Gestão de Clientes

**Feature Branch**: `001-authentication-clients`

**Created**: 2026-11-18

**Status**: Draft

**Input**: User description: "Criar o primeiro recorte funcional (Iteração 1) do FrameFlow Studio: Autenticação de Fotógrafos e Gestão de Clientes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Conhecer o produto e iniciar o acesso (Priority: P1)

Como visitante, quero ver uma página inicial simples que apresente o FrameFlow Studio e ofereça opções claras de entrada ou criação de conta, para decidir como acessar a plataforma.

**Why this priority**: A página inicial é o primeiro ponto de entrada público e orienta visitantes para cadastro ou login.

**Independent Test**: Em sessão pública, acessar a página inicial e verificar a apresentação do produto e os dois caminhos disponíveis.

**Acceptance Scenarios**:

1. **Given** que um visitante não está autenticado, **When** abre a página inicial, **Then** vê uma apresentação clara do FrameFlow Studio e opções para Entrar e Criar Conta.
2. **Given** que o visitante seleciona Entrar, **When** confirma a ação, **Then** é direcionado ao fluxo de autenticação existente.
3. **Given** que o visitante seleciona Criar Conta, **When** confirma a ação, **Then** é direcionado ao fluxo de cadastro.

---

### User Story 2 - Autenticar-se com segurança (Priority: P1)

Como fotógrafo, quero criar uma conta com e-mail e senha, entrar no sistema e sair da sessão atual, para acessar exclusivamente o meu ambiente privado.

**Why this priority**: A autenticação é requisito de acesso e base de segurança para todas as operações privadas da iteração.

**Independent Test**: Criar uma conta, entrar com as credenciais válidas, acessar uma área protegida e sair; depois verificar que a área privada não é acessível sem uma sessão válida.

**Acceptance Scenarios**:

1. **Given** que um visitante está na tela de cadastro, **When** informa um e-mail válido e uma senha aceita pelo sistema, **Then** a conta é criada e a sessão autenticada é iniciada ou apresentada para confirmação conforme o fluxo definido.
2. **Given** que um fotógrafo possui uma conta válida, **When** informa suas credenciais corretas na tela de login, **Then** é autenticado e direcionado ao sistema protegido.
3. **Given** que um fotógrafo está autenticado, **When** solicita Logout, **Then** a sessão é encerrada e ele perde o acesso às áreas privadas.
4. **Given** que um visitante não está autenticado, **When** tenta abrir uma rota privada, **Then** o acesso é negado e o visitante é direcionado ao fluxo de autenticação.

---

### User Story 3 - Gerenciar meus próprios clientes (Priority: P1)

Como fotógrafo autenticado, quero listar, cadastrar, editar e excluir meus clientes, para manter atualizados apenas os dados dos meus próprios clientes.

**Why this priority**: A gestão de clientes é a principal capacidade de negócio desta iteração e depende da autenticação e do isolamento de dados.

**Independent Test**: Com sessão ativa, cadastrar um cliente, localizar o registro na lista, editar seus dados e excluí-lo após confirmação; em seguida testar com outra conta para comprovar que os registros não são compartilhados.

**Acceptance Scenarios**:

1. **Given** que um fotógrafo está autenticado, **When** abre a tela de clientes, **Then** vê somente os clientes associados à própria conta.
2. **Given** que o fotógrafo está na tela de cadastro de cliente, **When** informa um nome completo obrigatório e opcionalmente e-mail, telefone e observações válidos, **Then** o cliente é criado e aparece na sua lista.
3. **Given** que existe um cliente próprio na lista, **When** o fotógrafo seleciona editar e salva alterações válidas, **Then** os dados atualizados são exibidos.
4. **Given** que existe um cliente próprio na lista, **When** o fotógrafo solicita exclusão e confirma a ação, **Then** o cliente deixa de aparecer na lista.
5. **Given** que o fotógrafo solicita exclusão, **When** cancela a confirmação, **Then** o cliente permanece sem alterações.

---

### User Story 4 - Gerenciar trabalhos fotográficos (Priority: P1)

Como fotógrafo autenticado, quero criar, listar, editar e excluir trabalhos fotográficos associados aos meus clientes, para organizar as demandas da minha rotina dentro da plataforma.

**Why this priority**: A gestão de trabalhos é uma capacidade central da especificação desta iteração e permite relacionar os atendimentos aos clientes do fotógrafo.

**Independent Test**: Com uma sessão ativa, cadastrar um trabalho vinculado a um cliente próprio, localizar o registro na lista, editar seus dados e excluí-lo após confirmação.

**Acceptance Scenarios**:

1. **Given** que um fotógrafo está autenticado, **When** abre a área de trabalhos, **Then** vê somente os trabalhos associados à própria conta.
2. **Given** que o fotógrafo possui um cliente próprio, **When** cadastra um trabalho informando uma descrição obrigatória e seleciona esse cliente, **Then** o trabalho é criado e aparece na sua lista.
3. **Given** que existe um trabalho próprio na lista, **When** o fotógrafo seleciona editar e salva dados válidos, **Then** as informações atualizadas são exibidas.
4. **Given** que existe um trabalho próprio na lista, **When** solicita a exclusão e confirma, **Then** o trabalho deixa de aparecer na lista.

---

### User Story 5 - Agendar sessões e gerenciar consultas (Priority: P1)

Como fotógrafo autenticado, quero cadastrar, listar, editar e excluir sessões ou consultas vinculadas aos meus clientes e trabalhos, para organizar os compromissos da minha rotina.

**Why this priority**: O agendamento é parte contemplada desta iteração e depende do vínculo seguro com o fotógrafo, seus clientes e seus trabalhos.

**Independent Test**: Com uma sessão ativa, cadastrar uma sessão vinculada a um cliente e a um trabalho próprios, listar, editar e excluir o agendamento.

**Acceptance Scenarios**:

1. **Given** que um fotógrafo está autenticado, **When** abre a área de agendamentos, **Then** vê somente as sessões associadas à própria conta.
2. **Given** que o fotógrafo possui um cliente e um trabalho próprios, **When** cadastra uma sessão informando data, horário e vínculo válido, **Then** a sessão é criada e aparece na sua agenda.
3. **Given** que existe uma sessão própria, **When** o fotógrafo altera data, horário ou vínculo e salva dados válidos, **Then** os dados atualizados são exibidos.
4. **Given** que existe uma sessão própria, **When** o fotógrafo solicita a exclusão e confirma, **Then** a sessão deixa de aparecer na lista ou agenda.

---

### User Story 6 - Acompanhar o status dos trabalhos fotográficos (Priority: P1)

Como fotógrafo autenticado, quero visualizar e atualizar o status dos meus trabalhos fotográficos, para acompanhar o andamento de cada demanda.

**Why this priority**: O rastreamento do status permite controlar o fluxo operacional dos trabalhos contemplados nesta especificação.

**Independent Test**: Com uma sessão ativa, criar um trabalho, alterar seu status por meio dos estados permitidos e verificar que o novo estado é exibido na listagem e nos detalhes.

**Acceptance Scenarios**:

1. **Given** que um fotógrafo possui um trabalho próprio, **When** abre seus detalhes, **Then** visualiza o status atual do trabalho.
2. **Given** que existe um trabalho próprio, **When** o fotógrafo seleciona um estado válido, **Then** o status é atualizado e exibido imediatamente na tela.
3. **Given** que um usuário tenta informar um estado não permitido, **When** salva a alteração, **Then** o sistema impede a atualização e apresenta uma mensagem clara.
4. **Given** que um fotógrafo autenticado tenta alterar o trabalho de outra conta, **When** solicita a atualização, **Then** a operação é negada.

---

### Edge Cases

- Tentativa de cadastro com e-mail já utilizado: o sistema deve informar que a conta não pode ser criada com esse e-mail.
- Tentativa de login com e-mail ou senha incorretos: o sistema deve apresentar uma mensagem de erro sem revelar se o e-mail existe ou não além do necessário.
- Cadastro de cliente sem nome completo: o sistema deve impedir a criação e indicar o campo obrigatório.
- Tentativa de edição ou exclusão de registro que não pertence ao fotógrafo autenticado: o sistema deve negar a operação.
- Sessão expirada enquanto o usuário está em uma rota privada: o usuário deve ser direcionado ao login e não deve visualizar dados privados.
- Exclusão cancelada pelo usuário: nenhum dado deve ser alterado.
- Dados opcionais vazios no cadastro ou edição: o cliente deve continuar válido quando nome completo estiver preenchido.
- Tentativa de cadastrar ou editar um trabalho sem descrição: o sistema deve impedir a operação e indicar o campo obrigatório.
- Tentativa de vincular um trabalho a um cliente que não pertence ao fotógrafo autenticado: o sistema deve negar o vínculo.
- Tentativa de cadastrar uma sessão sem data, horário ou vínculo válido: o sistema deve impedir a operação e indicar os campos obrigatórios.
- Tentativa de vincular uma sessão a um cliente ou trabalho que não pertence ao fotógrafo autenticado: o sistema deve negar o vínculo.
- Tentativa de atualizar o status para um estado não permitido: o sistema deve impedir a alteração.
- Tentativa de editar ou excluir trabalho ou sessão pertencente a outra conta: o sistema deve negar a operação.
- Exclusão cancelada pelo usuário: nenhum trabalho ou sessão deve ser alterado.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a public landing page presenting the FrameFlow Studio and clear buttons to Enter and Create Account.
- **FR-002**: The system MUST allow a visitor to create a photographer account using email and password.
- **FR-003**: The system MUST validate the email format and password requirements before account creation.
- **FR-004**: The system MUST allow an authenticated photographer to log in with valid credentials.
- **FR-005**: The system MUST allow an authenticated photographer to log out and terminate access to private routes.
- **FR-006**: The system MUST prevent unauthenticated users from accessing private routes and direct them to authentication.
- **FR-007**: The system MUST provide a protected client-management area available only to authenticated photographers.
- **FR-008**: The system MUST list only the clients belonging to the authenticated photographer.
- **FR-009**: The system MUST allow an authenticated photographer to create a client with a required full name and optional email, phone, and observations.
- **FR-010**: The system MUST prevent client creation when the full name is blank.
- **FR-011**: The system MUST allow an authenticated photographer to edit their own clients.
- **FR-012**: The system MUST allow an authenticated photographer to exclude their own clients only after explicit confirmation.
- **FR-013**: The system MUST preserve a client unchanged when deletion is cancelled.
- **FR-014**: The system MUST associate every client record with the authenticated photographer's user identifier.
- **FR-015**: The system MUST enforce Row Level Security so a photographer cannot read, create, update, or delete records belonging to another account.
- **FR-016**: The system MUST present clear feedback for validation errors and unsuccessful authentication or client operations.
- **FR-017**: The system MUST allow an authenticated photographer to create, list, edit, and delete their own photographic works.
- **FR-018**: The system MUST require a description for every photographic work.
- **FR-019**: The system MUST associate every photographic work with the authenticated photographer and may associate it with one of that photographer's clients.
- **FR-020**: The system MUST allow an authenticated photographer to create, list, edit, and delete sessions or appointments associated with their own account.
- **FR-021**: The system MUST require a valid date, time, and applicable client or work relationship for each session or appointment.
- **FR-022**: The system MUST prevent a photographer from associating works or sessions with clients or works belonging to another account.
- **FR-023**: O sistema DEVE rastrear o status de cada trabalho fotográfico.
- **FR-024**: O sistema DEVE permitir somente os seguintes estados para trabalhos fotográficos: Solicitado, Agendado, Em Andamento, Concluído, Entregue e Cancelado.
- **FR-025**: O sistema DEVE registrar o status atual de cada trabalho fotográfico e exibí-lo na lista e nos detalhes do trabalho.
- **FR-026**: O sistema DEVE aplicar segurança por nível de registro (RLS) a trabalhos e sessões, impedindo que um fotógrafo leia, crie, altere ou exclua registros pertencentes a outra conta.
- **FR-027**: O sistema DEVE preservar trabalhos e sessões sem alterações quando a exclusão for cancelada.
- **FR-028**: O sistema DEVE apresentar feedback claro para erros de validação e operações malsucedidas relacionadas a trabalhos, sessões e status.

### Key Entities *(include if feature involves data)*

- **Photographer Account**: Representa um usuário autenticado da plataforma; possui clientes, trabalhos e sessões e é identificado exclusivamente pelo sistema de autenticação.
- **Client**: Representa uma pessoa gerenciada por um fotógrafo; inclui nome completo, e-mail opcional, telefone opcional e observações opcionais e pertence exclusivamente ao fotógrafo proprietário.
- **Photographic Work**: Representa uma demanda fotográfica gerenciada por um fotógrafo; inclui uma descrição obrigatória, pertence exclusivamente ao fotógrafo proprietário, pode estar associado a um dos seus clientes e possui um dos estados permitidos: Solicitado, Agendado, Em Andamento, Concluído, Entregue ou Cancelado.
- **Session / Appointment**: Representa uma sessão fotográfica ou consulta agendada; inclui data, horário, fotógrafo proprietário e vínculos aplicáveis ao cliente e ao trabalho fotográfico do fotógrafo.
- **Work Status**: Representa o estágio atual de um trabalho fotográfico e deve utilizar somente um dos estados definidos nesta especificação.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of usability test participants can identify both access options on the public landing page and reach the intended flow.
- **SC-002**: At least 95% of test users successfully create an account and sign in on their first attempt when using valid data.
- **SC-003**: 100% of unauthenticated attempts to open protected routes are redirected to authentication with no private data displayed.
- **SC-004**: 100% of tested login, logout, and session-expiration flows complete without stale access to private pages.
- **SC-005**: 100% of tested valid client records appear in the owner's list within the normal screen refresh cycle.
- **SC-006**: 100% of attempts to view or modify another photographer's client records are denied in security tests.
- **SC-007**: 95% of test users successfully complete create, edit, and confirmed-delete flows without assistance.
- **SC-008**: 100% of client records require a full name and never expose optional fields as mandatory.
- **SC-009**: 100% of tested valid photographic works appear in the owner's work list and remain isolated from other photographers.
- **SC-010**: 100% of tested sessions are associated only with valid data owned by the authenticated photographer.
- **SC-011**: 100% of status changes use an allowed state and are displayed in the work list and details.
- **SC-012**: 100% of attempts to access, link, edit, or delete another photographer's work or session are denied in security tests.
- **SC-013**: 95% of test users successfully complete create, edit, and confirmed-delete flows for works and sessions without assistance.

## Assumptions

- The primary target is a desktop and mobile-responsive web experience, but no independent mobile application is included.
- Email-and-password authentication is the only authentication method required for this iteration.
- Account creation and login use standard form validation and user-facing error messages.
- Deletion uses an explicit confirmation step and is permanent; no undo or recovery flow is specified.
- The platform may contain multiple photographers, but no team sharing or cross-account data sharing is included.
- Session or authentication state is retained by the platform according to normal web application behavior until logout or expiration.
- Work and session data belongs exclusively to the authenticated photographer and may not be shared across accounts.
- A photographic work may optionally be associated with a client; a session may be associated with a client and, when applicable, a photographic work.

## Out of Scope

- Dashboard metrics and business analytics.
- Payments or financial management.
- Photo upload, storage, or delivery.
- WhatsApp integration.
- Independent mobile application.
- Teams, employee accounts, or shared data permissions.
