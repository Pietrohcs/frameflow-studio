export interface Client {
  id: string;
  user_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  observations: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateClientInput = Pick<
  Client,
  "full_name" | "email" | "phone" | "observations"
>;

export type UpdateClientInput = CreateClientInput;
