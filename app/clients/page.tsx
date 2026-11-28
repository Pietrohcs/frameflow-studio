import { FeedbackMessage } from "@/components/shared/FeedbackMessage";
import { ClientList } from "@/components/clients/ClientList";
import {
  createSupabaseServerClient,
  requireAuthenticatedUser,
} from "@/lib/supabase/server";
import type { Client } from "@/types/client";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const user = await requireAuthenticatedUser("/login");
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("clients")
    .select("id,user_id,full_name,email,phone,observations,created_at,updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const clients = (data ?? []) as Client[];

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-lg font-black tracking-tight text-slate-950">
              FrameFlow <span className="text-sky-700">Studio</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">{user.email}</p>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {error ? (
          <div className="mb-6">
            <FeedbackMessage
              message="Não foi possível carregar os clientes. Tente novamente."
              type="error"
            />
          </div>
        ) : null}

        <ClientList clients={clients} />
      </section>
    </main>
  );
}
