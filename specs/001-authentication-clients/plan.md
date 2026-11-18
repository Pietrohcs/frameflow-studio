# Implementation Plan: Autenticação e Gestão de Clientes

**Branch**: `001-authentication-clients` | **Date**: 2026-11-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-authentication-clients/spec.md`

## Summary

Implement the first FrameFlow Studio iteration as a Next.js App Router web application with public landing, email/password authentication, protected client management, and Supabase-backed data isolation. The implementation will use React, TypeScript, Tailwind CSS, Supabase Auth, and PostgreSQL RLS. The `clients` table will belong to a photographer through `user_id`, and every read/write policy will require ownership by `auth.uid()`.

## Technical Context

**Language/Version**: TypeScript; Next.js App Router with React

**Primary Dependencies**: Next.js, React, Tailwind CSS, Supabase client library

**Storage**: Supabase PostgreSQL; Supabase Auth for photographer identities

**Testing**: Next.js production build, manual browser acceptance testing, and two-account Supabase RLS security testing

**Target Platform**: Responsive web application for modern desktop and mobile browsers

**Project Type**: Single Next.js web application

**Performance Goals**: Primary actions complete without noticeable blocking under normal local/network conditions; no dedicated concurrency target is specified

**Constraints**:
- No service-role key or secret credential in browser code or repository files
- RLS must be enabled and tested before private client operations are considered complete
- No scheduling, work status, dashboard metrics, finance, uploads, WhatsApp, mobile app, or team-sharing functionality
- No requirements or libraries outside the official stack

**Scale/Scope**: Multiple independent photographer accounts with individual client lists; MVP-sized iteration

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Human approval**: PASS. The plan documents the proposed table and RLS policies but does not apply or approve them as implementation activity.
- **Spec-driven flow**: PASS. Implementation must begin only after specification and plan have been reviewed and approved by the two members.
- **Privacy and isolation**: PASS. `clients.user_id` and RLS policies enforce access only for `auth.uid()`.
- **Credential security**: PASS. Only public Supabase URL and anon/publishable key will be browser-visible; `.env.local` and `.gitignore` protect local configuration.
- **Scope fidelity**: PASS. The plan excludes dashboard metrics, appointments, work status, finance, uploads, WhatsApp, mobile app, and team sharing.
- **TypeScript and organization**: PASS. The source layout uses typed components and focused feature folders.
- **Review and versioning**: PASS. The constitution requires human review and human-executed Git operations; the plan adds no automated Git behavior.

## Project Structure

### Documentation (this feature)

```text
specs/001-authentication-clients/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── routes-and-data.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
app/
├── layout.tsx
├── page.tsx                         # Public landing page
├── globals.css
├── login/
│   └── page.tsx                     # Email/password login
├── signup/
│   └── page.tsx                     # Photographer account creation
├── clients/
│   ├── page.tsx                     # Protected client list
│   └── loading.tsx                  # Optional route loading state
├── auth/
│   └── signout/
│       └── route.ts                 # Session logout route
└── components/                      # Shared UI components as needed

components/
├── auth/
│   ├── LoginForm.tsx
│   └── SignupForm.tsx
└── clients/
    ├── ClientForm.tsx
    ├── ClientList.tsx
    └── DeleteClientDialog.tsx

lib/
└── supabase/
    ├── client.ts                    # Browser Supabase client
    └── server.ts                    # Server Supabase client/session helpers

supabase/
└── migrations/
    └── <timestamp>_create_clients.sql

types/
└── client.ts

tests/                              # Optional focused browser/security scripts if needed

.env.example
.gitignore
package.json
next.config.ts
postcss.config.*
tsconfig.json
```

**Structure Decision**: Use a single Next.js App Router application. Supabase remains external managed infrastructure; the repository keeps the browser/server integration in `lib/supabase`, route and form components in App Router directories and feature components, and the reviewed schema migration in `supabase/migrations`.

## Implementation Boundaries

### Landing Page

- Implement `/` as public content.
- Add clear actions for `/login` and `/signup`.
- Optionally redirect an active session to `/clients`.

### Authentication

- Implement `/signup` and `/login` with email/password forms.
- Handle invalid email, weak or invalid password, duplicate account, login failure, and confirmation behavior according to Supabase configuration.
- Implement logout through the `/auth/signout` route or an equivalent server action that clears the authenticated session.
- Protected route checks must occur before protected client data is requested or rendered.

### Client Management

- Implement `/clients` as a protected route.
- Query `public.clients` using an authenticated client and rely on RLS for filtering and authorization.
- Include create and edit forms with required `full_name` validation and optional `email`, `phone`, and `observations` fields.
- Set `user_id` from the authenticated identity during insertion, never from form input.
- Use an explicit confirmation before permanent deletion.
- Keep unauthorized or unknown IDs hidden and return no cross-account data.

### Supabase Schema

- Create `public.clients` with the fields and constraints defined in `data-model.md`.
- Enable RLS and add separate select, insert, update, and delete policies using `auth.uid()`.
- Store SQL in a migration so security changes can be reviewed before application.
- Do not apply table or policy changes until both project members approve them.

### Environment Configuration

- Define `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` or the publishable-key equivalent supported by the project setup.
- Add `.env.local` to `.gitignore`.
- Add `.env.example` with names only.
- Never commit secret, service-role, or personal credentials.

## Validation Plan

1. Run `npm run dev` and verify local startup.
2. Run `npm run build` and resolve TypeScript/build errors.
3. Execute manual landing, signup, login, logout, protected-route, and client lifecycle tests.
4. Use two authenticated accounts to test cross-account read, insert, update, and delete denial.
5. Review code and RLS migration with both project members before branch integration.

## Complexity Tracking

No constitution violations are expected. Any future request to add dashboard metrics, scheduling, work status, finance, uploads, WhatsApp, mobile app, teams, or cross-account sharing requires renewed human scope approval and a specification update.
