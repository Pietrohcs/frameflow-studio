"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FeedbackMessage } from "@/components/shared/FeedbackMessage";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Client } from "@/types/client";

type DeleteClientDialogProps = {
  client: Client;
  onClose: () => void;
  onDeleted: () => void;
};

export function DeleteClientDialog({ client, onClose, onDeleted }: DeleteClientDialogProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function confirmDelete() {
    setFeedback("");
    setIsDeleting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setFeedback("Sua sessão expirou. Entre novamente para continuar.");
        return;
      }

      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", client.id)
        .eq("user_id", user.id);

      if (error) {
        setFeedback("Não foi possível excluir o cliente. Tente novamente.");
        return;
      }

      router.refresh();
      onDeleted();
    } catch {
      setFeedback("Não foi possível excluir o cliente. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4" role="dialog" aria-modal="true" aria-labelledby="delete-client-title">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 id="delete-client-title" className="text-xl font-bold text-slate-950">
          Excluir cliente
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Deseja excluir <strong>{client.full_name}</strong>? Esta ação não pode ser desfeita.
        </p>

        <div className="mt-5">
          <FeedbackMessage message={feedback} type="error" />
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            disabled={isDeleting}
            className="rounded-xl bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Excluindo..." : "Confirmar exclusão"}
          </button>
        </div>
      </div>
    </div>
  );
}
