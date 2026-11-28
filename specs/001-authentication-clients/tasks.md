# Tasks: Autenticação e Gestão de Clientes

**Input**: Design documents from `/specs/001-authentication-clients/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/routes-and-data.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Every task includes an exact target file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Next.js, React, TypeScript, and Tailwind application.

- [x] T001 Initialize the Next.js App Router project with TypeScript and Tailwind CSS in `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.*`, and `app/globals.css`
- [x] T002 [P] Add the project scripts and dependencies for Next.js, React, Tailwind CSS, and the Supabase client in `package.json`
- [x] T003 [P] Create the base responsive application layout in `app/layout.tsx` and global design styles in `app/globals.css`
- [x] T004 [P] Add public environment variable names and secret-safe local configuration guidance in `.env.example` and `.gitignore`
- [x] T005 [P] Create the initial client TypeScript shape in `types/client.ts`, aligned with `data-model.md` Client fields
- [x] T006 [P] Create the Supabase directory and migration location structure in `supabase/migrations/.gitkeep`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story can be implemented.

**⚠️ CRITICAL**: No user story implementation can begin until this phase is complete.

- [x] T007 Create the browser Supabase client in `lib/supabase/client.ts` using only public environment variables
- [x] T008 [P] Create server-side Supabase session helpers in `lib/supabase/server.ts` for authenticated route checks
- [x] T009 Create the reviewed `clients` table migration, including `Client.id`, `Client.user_id`, `Client.full_name`, `Client.email`, `Client.phone`, `Client.observations`, `Client.created_at`, and `Client.updated_at` constraints from `data-model.md`, in `supabase/migrations/<timestamp>_create_clients.sql`
- [x] T010 Add select, insert, update, and delete RLS policies restricted to `auth.uid() = user_id` for the migration in `supabase/migrations/<timestamp>_create_clients.sql`
- [x] T011 [P] Add the shared authenticated-route redirect behavior for missing or expired sessions in `lib/supabase/server.ts`
- [x] T012 [P] Add a reusable user-facing error/validation feedback component in `components/shared/FeedbackMessage.tsx`

**Checkpoint**: Foundation ready. The Supabase schema, RLS, environment configuration, and route-session helpers must be reviewed before user-story work begins.

---

## Phase 3: User Story 1 - Página Inicial Pública (Priority: P1) 🎯 MVP

**Goal**: Present the FrameFlow Studio publicly and route visitors to login or account creation.

**Independent Test**: Open `/` without a session and verify the presentation plus navigation to `/login` and `/signup`; verify an active session may proceed to `/clients`.

### Implementation for User Story 1

- [x] T013 [US1] Implement the public landing page and both access actions in `app/page.tsx`
- [x] T014 [P] [US1] Create a focused public navigation/header component in `components/landing/LandingHeader.tsx`
- [x] T015 [P] [US1] Add landing-page presentation and responsive call-to-action styles in `app/globals.css`
- [x] T016 [US1] Integrate optional authenticated-user redirect to `/clients` in `app/page.tsx`

**Checkpoint**: User Story 1 is fully usable independently and the landing page provides clear access to authentication flows.

---

## Phase 4: User Story 2 - Cadastro, Login, Logout e Proteção (Priority: P1)

**Goal**: Allow photographers to create accounts, sign in, sign out, and prevent unauthenticated access to private routes.

**Independent Test**: Create or sign in to a valid account, access `/clients`, sign out, and confirm direct access to `/clients` redirects to authentication.

### Implementation for User Story 2

- [x] T017 [US2] Implement the email/password sign-up form with email and password validation in `components/auth/SignupForm.tsx`
- [x] T018 [US2] Implement the `/signup` App Router page in `app/signup/page.tsx`
- [x] T019 [US2] Implement the email/password login form with invalid-credential feedback in `components/auth/LoginForm.tsx`
- [x] T020 [US2] Implement the `/login` App Router page in `app/login/page.tsx`
- [x] T021 [US2] Implement authenticated session termination and redirect behavior in `app/auth/signout/route.ts`
- [x] T022 [US2] Add protected-route session validation before rendering private content in `app/clients/page.tsx`
- [x] T023 [US2] Display duplicate-account and authentication failure feedback using the shared feedback component in `components/auth/SignupForm.tsx` and `components/auth/LoginForm.tsx`
- [x] T024 [US2] Add logout navigation to the private application shell in `app/clients/page.tsx`

**Checkpoint**: User Story 2 is complete; unauthenticated users cannot render private routes and photographers can create, enter, and terminate sessions.

---

## Phase 5: User Story 3 - Gestão dos Próprios Clientes (Priority: P1)

**Goal**: Let each authenticated photographer list, create, edit, and confirm-delete only their own clients.

**Independent Test**: With two accounts, create/edit/delete a client as the owner and verify a second account cannot list or modify that record.

### Implementation for User Story 3

- [ ] T025 [US3] Define and implement owner-scoped client list querying in `app/clients/page.tsx` using the authenticated session and RLS
- [ ] T026 [P] [US3] Create the reusable client list/table component in `components/clients/ClientList.tsx`
- [ ] T027 [P] [US3] Implement create/edit form fields for `Client.full_name`, `Client.email`, `Client.phone`, and `Client.observations` with canonical constraints from `data-model.md` in `components/clients/ClientForm.tsx`
- [ ] T028 [US3] Implement client creation, setting `Client.user_id` only from the authenticated identity and rejecting blank `Client.full_name` in `components/clients/ClientForm.tsx`
- [ ] T029 [US3] Implement client editing for owned records while preserving immutable `Client.id` and `Client.user_id` in `components/clients/ClientForm.tsx`
- [ ] T030 [US3] Implement explicit cancel/confirm deletion behavior in `components/clients/DeleteClientDialog.tsx`
- [ ] T031 [US3] Connect confirmed deletion to the owned client record and refresh the owner list in `app/clients/page.tsx`
- [ ] T032 [US3] Add owner-only empty, loading, validation, and operation feedback states in `app/clients/page.tsx` and `components/clients/ClientList.tsx`

**Checkpoint**: User Story 3 is complete and independently testable for CRUD and cross-account isolation.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Complete validation, security review, responsive polish, and documentation updates.

- [ ] T033 [P] Add responsive styling and accessible labels for authentication and client screens in `app/globals.css`, `app/login/page.tsx`, `app/signup/page.tsx`, and `app/clients/page.tsx`
- [ ] T034 [P] Document local setup and environment variables without secrets in `.env.example` and `README.md`
- [ ] T035 Review the final RLS migration and verify no public or service-role client bypass exists in `supabase/migrations/<timestamp>_create_clients.sql`
- [ ] T036 Run the complete quickstart validation scenarios in `specs/001-authentication-clients/quickstart.md`
- [ ] T037 Run `npm run build` and resolve all compilation errors
- [ ] T038 Perform two-account RLS tests for select, insert, update, and delete ownership in Supabase
- [ ] T039 Add no out-of-scope functionality; verify the final UI and routes are limited to landing, authentication, and clients

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; starts immediately.
- **Foundational (Phase 2)**: Depends on Phase 1; blocks all user stories.
- **User Story 1 (Phase 3)**: Can start after the foundational route and environment infrastructure is ready.
- **User Story 2 (Phase 4)**: Depends on Phase 2 and provides the authentication used by User Story 3.
- **User Story 3 (Phase 5)**: Depends on Phase 2 and an active authenticated session from User Story 2.
- **Polish (Phase 6)**: Depends on the desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Independent after the shared foundation.
- **User Story 2 (P1)**: Independent of landing content but depends on foundational Supabase/session setup.
- **User Story 3 (P1)**: Depends on User Story 2 for authenticated session behavior; otherwise the client data rules are isolated to this story.

### Within Each User Story

- Models and shared types before form/list implementation.
- Server/session protection before protected rendering.
- Core implementation before integration and feedback polish.
- Each story must pass its independent test before subsequent integration work.

## Parallel Opportunities

- Setup tasks marked [P] can run in parallel after project initialization.
- Browser and server Supabase helpers can be prepared in parallel once the project exists.
- Landing header, landing styles, and landing page implementation can proceed in parallel after routing exists.
- Login and signup components may be implemented in parallel after the shared auth foundation is available.
- Client list, client form, and delete dialog are independent UI files and may be implemented in parallel after client types exist.

## Implementation Strategy

### MVP First (Landing plus Authentication)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Complete Phase 4: User Story 2.
5. Validate public entry and private-route protection before client CRUD.

### Incremental Delivery

1. Foundation ready: Next.js structure, Supabase clients, schema, and RLS.
2. User Story 1: Public landing experience.
3. User Story 2: Secure account and session flows.
4. User Story 3: Isolated client CRUD.
5. Polish: Final build, manual flows, and two-account RLS verification.

## Notes

- [P] tasks use different files and no incomplete-task dependency.
- [US1], [US2], and [US3] map tasks to the three specification user stories.
- Canonical field constraints come from `data-model.md`; implement tasks must follow that model.
- No test framework or extra application library is added unless explicitly approved for a later iteration.
