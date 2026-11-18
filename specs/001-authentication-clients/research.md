# Phase 0 Research: Autenticação e Gestão de Clientes

## Decision 1: Next.js App Router for public and protected routes

**Decision**: Use Next.js App Router with Server Components for layout and route protection, and Client Components only for interactive authentication and client forms.

**Rationale**:
- Matches the official stack and keeps public and private route boundaries explicit.
- Server-side session checks can prevent protected content from rendering for unauthenticated users.
- Client Components remain limited to form interactions and confirmation dialogs.

**Alternatives considered**:
- Pages Router: compatible with Next.js but less aligned with the declared App Router requirement.
- API route-only architecture: unnecessary for this iteration because Supabase can be called from Next.js with RLS as the data boundary.

## Decision 2: Supabase Auth with email/password

**Decision**: Use Supabase Auth email-and-password sign-up, sign-in, session retrieval, and sign-out.

**Rationale**:
- Directly satisfies the specified authentication method.
- Supabase provides session management and authenticated identity used by PostgreSQL policies.
- No additional authentication library is necessary.

**Alternatives considered**:
- Third-party OAuth or social login: out of scope and not requested.
- Custom credential storage: prohibited by security and infrastructure expectations.

## Decision 3: Supabase browser and server integration

**Decision**: Use separate Supabase clients for browser interactions and server-side route checks, using environment variables for the public URL and publishable/anon key only.

**Rationale**:
- Keeps browser authentication operations standard and supports server-side route protection.
- Never exposes the Supabase service-role key or uses it in browser code.
- RLS remains the authoritative database boundary.

**Alternatives considered**:
- Direct PostgreSQL access from Next.js: unnecessary and would bypass Supabase Auth session context.
- Service-role key for application queries: prohibited because it bypasses RLS.

## Decision 4: Client table ownership and RLS

**Decision**: Store `user_id` as `UUID` with a foreign key reference to `auth.users(id)`, enable RLS, and provide separate select, insert, update, and delete policies restricted with `auth.uid() = user_id`.

**Rationale**:
- Ensures every supported operation is evaluated against the authenticated Supabase identity.
- An insert policy can require `user_id` to match the authenticated account.
- The owner can access only its own client records even if client ID or other identifiers are guessed.

**Alternatives considered**:
- Filtering only in application queries: insufficient because it does not protect direct database access or future routes.
- Shared data model or organization_id: outside the MVP and team-sharing scope.

## Decision 5: Minimal testing approach

**Decision**: Validate the implementation with TypeScript compilation, Next.js production build, Supabase RLS security tests using two authenticated accounts, and manual acceptance tests in the browser.

**Rationale**:
- No additional test framework is required by the specification.
- This satisfies the constitution's Definition of Done without unnecessary dependencies.

**Alternatives considered**:
- Adding a browser or unit test framework: useful later, but not necessary for this recorte and would add libraries beyond the minimum scope.

## Resolved Technical Unknowns

- **Framework**: Next.js App Router, React, and TypeScript.
- **Styling**: Tailwind CSS.
- **Backend**: Supabase Auth and PostgreSQL.
- **Data isolation**: `user_id` plus RLS policies.
- **Testing**: Build, manual flows, and two-account RLS verification.
