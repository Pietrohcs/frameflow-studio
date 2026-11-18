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

### Edge Cases

- Tentativa de cadastro com e-mail já utilizado: o sistema deve informar que a conta não pode ser criada com esse e-mail.
- Tentativa de login com e-mail ou senha incorretos: o sistema deve apresentar uma mensagem de erro sem revelar se o e-mail existe ou não além do necessário.
- Cadastro de cliente sem nome completo: o sistema deve impedir a criação e indicar o campo obrigatório.
- Tentativa de edição ou exclusão de registro que não pertence ao fotógrafo autenticado: o sistema deve negar a operação.
- Sessão expirada enquanto o usuário está em uma rota privada: o usuário deve ser direcionado ao login e não deve visualizar dados privados.
- Exclusão cancelada pelo usuário: nenhum dado deve ser alterado.
- Dados opcionais vazios no cadastro ou edição: o cliente deve continuar válido quando nome completo estiver preenchido.

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

### Key Entities *(include if feature involves data)*

- **Photographer Account**: Represents an authenticated user of the platform; owns client records and is uniquely identified by the authentication system.
- **Client**: Represents a person managed by one photographer; includes full name, optional email, optional phone, and optional observations, and belongs exclusively to the owning photographer.

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

## Assumptions

- The primary target is a desktop and mobile-responsive web experience, but no independent mobile application is included.
- Email-and-password authentication is the only authentication method required for this iteration.
- Account creation and login use standard form validation and user-facing error messages.
- Deletion uses an explicit confirmation step and is permanent; no undo or recovery flow is specified.
- The platform may contain multiple photographers, but no team sharing or cross-account data sharing is included.
- Session or authentication state is retained by the platform according to normal web application behavior until logout or expiration.

## Out of Scope

- Session scheduling and appointment management.
- Photographic work tracking and status management.
- Dashboard metrics and business analytics.
- Payments or financial management.
- Photo upload, storage, or delivery.
- WhatsApp integration.
- Independent mobile application.
- Teams, employee accounts, or shared data permissions.
