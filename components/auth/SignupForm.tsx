"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FeedbackMessage } from "@/components/shared/FeedbackMessage";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    const normalizedEmail = email.trim();

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setFeedback("Informe um endereço de e-mail válido.");
      return;
    }

    if (password.length < 6) {
      setFeedback("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
      });

      if (error) {
        const duplicateAccount =
          error.code === "user_already_exists" ||
          error.message.toLowerCase().includes("already registered");

        setFeedback(
          duplicateAccount
            ? "Já existe uma conta cadastrada com este e-mail."
            : "Não foi possível criar a conta. Verifique os dados e tente novamente.",
        );
        return;
      }

      setFeedback("Conta criada com sucesso. Você já pode continuar.");
      router.push("/clients");
      router.refresh();
    } catch {
      setFeedback("Não foi possível criar a conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <FeedbackMessage message={feedback} type="error" />

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="signup-email">
          E-mail
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="signup-password">
          Senha
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-sky-700 px-4 py-3 font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Criando conta..." : "Criar conta"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Já possui uma conta?{" "}
        <Link className="font-bold text-sky-700 hover:text-sky-800" href="/login">
          Entrar
        </Link>
      </p>
    </form>
  );
}
