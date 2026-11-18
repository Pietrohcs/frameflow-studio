# Interface Contracts

## Public Routes

### `/`

- Public landing page.
- Displays a short FrameFlow Studio presentation.
- Provides navigation to `/login` and `/signup`.
- An already authenticated visitor may be redirected to `/clients`.

### `/login`

- Public authentication form.
- Inputs: `email`, `password`.
- Success: starts the authenticated session and redirects to `/clients`.
- Failure: displays a non-destructive authentication error and keeps the user on the form.

### `/signup`

- Public account-creation form.
- Inputs: `email`, `password`.
- Validates email format and password requirements before sign-up.
- Success: starts or confirms the authenticated session according to the Supabase email-confirmation setting.
- Failure: displays an account-creation error, including duplicate-email feedback when reported by Supabase.

## Protected Routes

### `/clients`

- Requires an active Supabase session.
- Unauthenticated access is redirected to `/login`.
- Lists only records satisfying RLS ownership by `auth.uid()`.
- Provides create, edit, and confirmed-delete interactions.

## Client Operations

### Create client

**Inputs**:
- `full_name` required
- `email` optional
- `phone` optional
- `observations` optional

**Behavior**:
- Reject whitespace-only `full_name`.
- Set `user_id` internally from the active authenticated session.
- Reject and display an error if insertion is unsuccessful.
- Return the created record to the owner’s list.

### Edit client

**Inputs**:
- Existing client ID
- `full_name` required
- `email` optional
- `phone` optional
- `observations` optional

**Behavior**:
- Load and update only a record owned by the active session.
- Preserve ownership and immutable identifiers.
- Reject another photographer’s client and do not expose private values.

### Delete client

**Inputs**:
- Existing client ID
- Explicit confirmation state

**Behavior**:
- Cancel leaves the record unchanged.
- Confirm invokes deletion only for a record owned by the active session.
- Remove the record from the owner’s list after success.

## Authentication Contract

- Logout clears the active session and redirects to `/` or `/login`.
- Expired or missing sessions cannot display protected client content.
- Protected-route checks must run before client data is rendered.

## Error Contract

- Validation errors identify the affected field or operation.
- Authentication errors do not expose protected account details beyond the generic outcome.
- Authorization failures return no data from another account.
- Successful operations provide concise visible feedback where appropriate.
