"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FeedbackMessage } from "@/components/shared/FeedbackMessage";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Client } from "@/types/client";

type ClientFormProps = {
  client?: Client;
  onCancel?: () => void;
  onSuccess?: () => void;
};

export function ClientForm({ client, onCancel, onSuccess }: ClientFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState(client?.full_name ?? "");
  const [email, setEmail] = useState(client?.email ?? "");
  const [phone, setPhone] = useState(client?.phone ?? "");
  const [observations, setObservations] = useState(client?.observations ?? "");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    const normalizedFullName = fullName.trim();
    const normalizedEmail = email.trim();

    if (!normalizedFullName) {
      setFeedback("O nome completo é obrigatório.");
      return;
    }

    if (normalizedEmail && !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setFeedback("Informe um endereço de e-mail válido ou deixe o campo vazio.");
      return;
    }

    setIsSubmitting(true);

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

      const values = {
        full_name: normalizedFullName,
        email: normalizedEmail || null,
        phone: phone.trim() || null,
        observations: observations.trim() || null,
      };

      const result = client
        ? await supabase
            .from("clients")
            .update(values)
            .eq("id", client.id)
            .eq("user_id", user.id)
        : await supabase.from("clients").insert({
            ...values,
            user_id: user.id,
          });

      if (result.error) {
        setFeedback("Não foi possível salvar o cliente. Tente novamente.");
        return;
      }

      setFeedback(client ? "Cliente atualizado com sucesso." : "Cliente cadastrado com sucesso.");
      router.refresh();
      onSuccess?.();
    } catch {
      setFeedback("Não foi possível salvar o cliente. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <FeedbackMessage message={feedback} type={feedback.includes("sucesso") ? "success" : "error"} />

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor={`full-name-${client?.id ?? "new"}`}>
          Nome completo <span className="text-red-600">*</span>
        </label>
        <input
          id={`full-name-${client?.id ?? "new"}`}
          name="full_name"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor={`email-${client?.id ?? "new"}`}>
          E-mail
        </label>
        <input
          id={`email-${client?.id ?? "new"}`}
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor={`phone-${client?.id ?? "new"}`}>
          Telefone
        </label>
        <input
          id={`phone-${client?.id ?? "new"}`}
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor={`observations-${client?.id ?? "new"}`}>
          Observações
        </label>
        <textarea
          id={`observations-${client?.id ?? "new"}`}
          name="observations"
          rows={4}
          value={observations}
          onChange={(event) => setObservations(event.target.value)}
          className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </button>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-sky-700 px-5 py-3 font-bold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Salvando..." : client ? "Salvar alterações" : "Cadastrar cliente"}
        </button>
      </div>
    </form>
  );
}
