# Quickstart: Authentication and Client Management

## Prerequisites

- Node.js compatible with the target Next.js version.
- A Supabase project with email/password authentication enabled.
- Human approval of the `clients` table and RLS policies before applying database changes.
- Local environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL=<project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-or-anon-key>
```

Do not put a Supabase `service_role` key in `.env.local` or browser code. Keep `.env.local` in `.gitignore` and provide `.env.example` containing variable names only.

## Database Setup

1. Review `data-model.md` with the two project members.
2. Apply the proposed `clients` table and RLS SQL only after explicit human approval.
3. Confirm RLS is enabled for `public.clients`.
4. Confirm all four owner policies exist: select, insert, update, and delete.

## Application Setup

```powershell
npm install
npm run dev
```

Open the local application URL reported by Next.js.

## Validation Scenarios

### Public entry

1. Open `/` without a session.
2. Confirm that the FrameFlow Studio presentation is visible.
3. Confirm `/login` and `/signup` links are available.

### Account creation and login

1. Open `/signup` and create a new photographer account with valid email and password.
2. Complete any Supabase email-confirmation step enabled in the project.
3. Sign in at `/login`.
4. Confirm redirect to `/clients`.

### Protected route

1. Sign out and open `/clients` directly.
2. Confirm redirect to authentication and no private client content is rendered.
3. Sign in and confirm `/clients` is accessible.

### Client lifecycle

1. Create a client with a full name and optional fields.
2. Confirm the record appears only in the active photographer’s list.
3. Edit the record and confirm the updated values appear.
4. Cancel deletion and confirm the record remains unchanged.
5. Confirm deletion and verify the record disappears.

### RLS isolation with two accounts

1. Sign in as Photographer A and create at least one client.
2. Sign out and sign in as Photographer B.
3. Confirm Photographer A’s client is not listed.
4. Attempt direct update or delete operations for Photographer A’s known client ID.
5. Confirm the operations are denied and the other record remains unchanged.

### Logout and expiration

1. Sign out while on `/clients`.
2. Confirm private routes are no longer accessible.
3. Open `/clients` in a session whose authentication state expired.
4. Confirm redirect to authentication before client data can be displayed.

## Completion Checks

- `npm run build` completes without errors.
- `npm run dev` starts the application without errors that block these flows.
- Two-account RLS tests pass for read, insert, update, and delete operations.
- Both project members review the implementation and perform manual tests before approval.
